import { PureComponent } from "react";
import CustomFileInput from "./components/customFileInput/CustomFileInput";

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
                <CustomFileInput />
            </div>
        );
    }
}

export default App;
