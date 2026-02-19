import { PureComponent } from "react";
import TableComponent from "@/components/TableComponent/TableComponent";

// Headers = keys of the data objects (used for lookup and as column label)
const TABLE_HEADERS = [
    "Name",
    "Date Implemented",
    "SubCompany Name",
    "SubCompany ID",
    "Type",
    "Region",
    "Owner",
    "Updated At",
    // "Status",
    // "Actions",
];

// Data: array of objects; keys match TABLE_HEADERS
const TABLE_DATA = [
    {
        "Name": "Doc1",
        "Date Implemented": "2/16/2026",
        "SubCompany Name": "Rapid MC",
        "SubCompany ID": "89898998",
        "Type": "PDF",
        "Region": "North",
        "Owner": "John Doe",
        "Updated At": "2/15/2026",
        "Status": "Active",
        "Actions": "View",
    },
    {
        "Name": "Doc2",
        "Date Implemented": "2/17/2026",
        "SubCompany Name": "Acme Corp",
        "SubCompany ID": "12345678",
        "Type": "Excel",
        "Region": "South",
        "Owner": "Jane Smith",
        "Updated At": "2/16/2026",
        "Status": "Pending",
        "Actions": "View",
    },
    // {
    //     name: "Doc3",
    //     dateImplemented: "2/18/2026",
    //     subCompanyName: "Global Inc",
    //     subCompanyId: "87654321",
    //     type: "PDF",
    //     region: "East",
    //     owner: "Bob Wilson",
    //     updatedAt: "2/17/2026",
    //     status: "Active",
    //     actions: "View",
    // },
];

const layoutStyles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
    },
    header: {
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        borderBottom: "1px solid #e0e0e0",
    },
    main: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "24px",
        paddingRight: "24px",
        boxSizing: "border-box",
    },
    mainContent: {
        width: "100%",
        maxWidth: "960px",
    },
    footer: {
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        borderTop: "1px solid #e0e0e0",
    },
};

export class App extends PureComponent {
    render() {
        return (
            <div style={layoutStyles.wrapper}>
                <header style={layoutStyles.header}>Header</header>
                <main style={layoutStyles.main}>
                    <div style={layoutStyles.mainContent}>
                        <TableComponent
                            headers={TABLE_HEADERS}
                            data={TABLE_DATA}
                        />
                    </div>
                </main>
                <footer style={layoutStyles.footer}>Footer</footer>
            </div>
        );
    }
}

export default App;
