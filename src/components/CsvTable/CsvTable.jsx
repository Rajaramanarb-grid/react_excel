import { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "@/components/CsvTable/CsvTable.module.scss";
import CustomerTable from "@/components/customerTable/CustomerTable";

const cx = classNames.bind(styles);

class CsvTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            data: [],
            users: [],
        };
    }

    fetchUsers = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users",
            );
            const data = await response.json();
            this.setState({ users: data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    componentDidMount() {
        this.fetchUsers();
    }

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;

            // Split rows
            const rows = text
                .trim()
                .split("\n")
                .map((row) => row.split(","));

            if (rows.length === 0) return;

            const originalHeaders = rows[0];
            const csvData = rows.slice(1);

            const headers = ["First Name", "Last Name", ...originalHeaders];

            const updatedData = csvData.map((row) => {
                const id = row[0];

                const matchedUser = this.state.users.find(
                    (u) => String(u.id) === String(id),
                );

                const firstName = matchedUser ? matchedUser.name : "";
                const lastName = matchedUser ? matchedUser.username : "";

                return [firstName, lastName, ...row];
            });

            this.setState({
                headers,
                data: updatedData,
            });
        };

        reader.readAsText(file);
    };

    handleRowChange = (updatedRowData, rowIndex) => {
        this.setState((prevState) => {
            // Create a copy of the data array
            const updatedData = [...prevState.data];

            // Update the specific row with the new data
            if (rowIndex >= 0 && rowIndex < updatedData.length) {
                updatedData[rowIndex] = updatedRowData;
            }

            return {
                data: updatedData,
            };
        });
    };

    downloadCSV = () => {
        const { headers, data } = this.state;

        if (!headers.length) return;

        const cleanHeaders = headers.map((h) => h.replace(/\r/g, "").trim());

        const headerRow = cleanHeaders.join(",");

        const rows = data.map((row) =>
            row
                .map((cell) => `"${String(cell).replace(/\r/g, "").trim()}"`)
                .join(","),
        );

        const csvContent = [headerRow, ...rows].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    render() {
        return (
            <div className={cx("csv")}>
                <h2 className={cx("csv__title")}>Upload CSV File</h2>
                <input
                    type="file"
                    accept=".csv"
                    onChange={this.handleFileUpload}
                    className={cx("csv__input")}
                />

                <CustomerTable
                    columns={this.state.headers}
                    data={this.state.data}
                    // visibleColumnCount={4}
                    validation={false}
                    onRowChange={this.handleRowChange}
                />

                {this.state.data.length > 0 && (
                    <button onClick={this.downloadCSV}>Download CSV</button>
                )}
            </div>
        );
    }
}

export default CsvTable;
