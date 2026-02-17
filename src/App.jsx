import { PureComponent } from "react";
import UploadComponent from "./components/BulkUploadComponent/UploadComponent";

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
                <UploadComponent/>
            </div>
        );
    }
}

export default App;