import { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "@/components/CsvTable/CsvTable.module.scss";
import CustomerTable from "@/components/customerTable/CustomerTable";
// import CsvUpload from "../CsvUpload/Csvupload";

const cx = classNames.bind(styles);

class CsvTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            data: [],
        };
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

            const headers = rows[0] || [];
            const data = rows.slice(1);

            this.setState({ headers, data });
        };

        reader.readAsText(file);
    };

    render() {
        const HEADERS = [
            "First Name",
            "Last Name",
            "Card Number",
            "Exp Month",
            "Exp Year",
            "CVV",
            "SSN",
        ];
        const DATA = [
            [
                "Arun",
                "Kumar",
                "4111111111111111",
                "1",
                "2030",
                "123",
                "111111111",
            ],
            [
                "Priya",
                "Sharma",
                "4222222222222222",
                "2",
                "2031",
                "234",
                "222222222",
            ],
            [
                "Rahul",
                "Verma",
                "4333333333333333",
                "3",
                "2032",
                "345",
                "333333333",
            ],
            [
                "Sneha",
                "Reddy",
                "4444444444444444",
                "4",
                "2033",
                "456",
                "444444444",
            ],
            [
                "Karthik",
                "Iyer",
                "4555555555555555",
                "5",
                "2034",
                "567",
                "555555555",
            ],
            [
                "Meena",
                "Nair",
                "4666666666666666",
                "6",
                "2035",
                "678",
                "666666666",
            ],
            [
                "Vikram",
                "Singh",
                "4777777777777777",
                "7",
                "2036",
                "789",
                "777777777",
            ],
            [
                "Anjali",
                "Gupta",
                "4888888888888888",
                "8",
                "2037",
                "890",
                "888888888",
            ],
            [
                "Rohit",
                "Patel",
                "4999999999999999",
                "9",
                "2038",
                "901",
                "999999999",
            ],
            [
                "Divya",
                "Das",
                "4000000000000000",
                "10",
                "2039",
                "123",
                "000000000",
            ],
        ];
        return (
            <div className={cx("csv")}>
                <h2 className={cx("csv__title")}>Upload CSV File</h2>

                {/* <CsvUpload /> */}

                <input
                    type="file"
                    accept=".csv"
                    onChange={this.handleFileUpload}
                    className={cx("csv__input")}
                />

                <CustomerTable
                    columns={HEADERS}
                    data={DATA}
                    // columns={this.state.headers}
                    // data={this.state.data}
                    visibleColumnCount={4}
                    validation={true}
                />
            </div>
        );
    }
}

export default CsvTable;
