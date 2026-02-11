import { PureComponent } from "react";
import CsvTable from "./components/CsvTable/CsvTable";

export class App extends PureComponent {
    render() {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CsvTable />
            </div>
        );
    }
}

export default App;
