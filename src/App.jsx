import { PureComponent } from "react";

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
                <CustomFileInput/>
            </div>
        );
    }
}

export default App;