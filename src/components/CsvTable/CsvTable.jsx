import { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "@/components/CsvTable/CsvTable.module.scss";
import CustomerTable from "@/components/customerTable/CustomerTable";
import CustomFileInput from "../customFileInput/CustomFileInput";

const cx = classNames.bind(styles);

class CsvTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            data: [],
            users: [],
            loading: false,
            error: "",
        };
    }

    chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    fetchUsersBatch = async (ids) => {
        const promises = ids.map((id) =>
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
                (res) => {
                    if (!res.ok) throw new Error("Failed");
                    return res.json();
                },
            ),
        );

        const results = await Promise.allSettled(promises);

        const userMap = new Map();

        results.forEach((r) => {
            if (r.status === "fulfilled") {
                const user = r.value;
                userMap.set(String(user.id), user);
            }
        });

        return userMap;
    };

    handleFileUpload = async (e) => {
        this.setState({ loading: true });

        const file = e.target.files[0];
        if (!file) {
            this.setState({ error: "File is required" });
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const text = event.target.result;

            if (!text || !text.trim()) {
                this.setState({
                    error: "CSV file is empty",
                });
                return;
            }

            const rows = text
                .trim()
                .split("\n")
                .map((row) => row.split(","));

            if (rows.length <= 1) {
                this.setState({
                    error: "CSV contains no data rows",
                });
                return;
            }

            const originalHeaders = rows[0];
            const csvData = rows.slice(1);

            const headers = ["First Name", "Last Name", ...originalHeaders];

            const rowChunks = this.chunkArray(csvData, 10);

            let finalData = [];

            for (const chunk of rowChunks) {
                const ids = chunk.map((row) => row[0]);

                const userMap = await this.fetchUsersBatch(ids);

                const enrichedRows = chunk.map((row) => {
                    const id = String(row[0]);
                    const user = userMap.get(id);

                    return [user?.name || "", user?.username || "", ...row];
                });

                finalData = [...finalData, ...enrichedRows];
            }

            this.setState({
                headers,
                data: finalData,
                loading: false,
                error: "",
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
                <CustomFileInput onChange={this.handleFileUpload} />

                {/* <input
                    type="file"
                    accept=".csv"
                    onChange={this.handleFileUpload}
                    className={cx("csv__input")}
                /> */}

                <CustomerTable
                    columns={this.state.headers}
                    data={this.state.data}
                    // visibleColumnCount={4}
                    validation={true}
                    onRowChange={this.handleRowChange}
                    isLoading={this.state.loading}
                    error={this.state.error}
                />

                {(this.state.data.length > 0 && this.state.error === "") && (
                    <button
                        className={cx("csv__button")}
                        onClick={this.downloadCSV}
                    >
                        Download CSV
                    </button>
                )}
            </div>
        );
    }
}

export default CsvTable;
