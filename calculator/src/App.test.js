import { render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";
import { createRoot, unmountComponentAtNode } from "react-dom/client";
import { act } from "react-dom/test-utils";
import App from "./App";

afterEach(cleanup);

describe("App Component", () => {
    it("should show + on Screen when I click on +", async () => {
        render(<App />);
        fireEvent.click(screen.getByTestId("+"));

        expect(screen.getByTestId("calculation")).toHaveTextContent("0+");
    });

    it("should show parenthese on Screen when I click on (", () => {
        render(<App />);
        fireEvent.click(screen.getByTestId("("));

        expect(screen.getByTestId("calculation")).toHaveTextContent("()");
    });

    it("should show 1 on Screen when I click on 1", () => {
        render(<App />);
        fireEvent.click(screen.getByTestId("1"));
        expect(screen.getByTestId("calculation")).toHaveTextContent("1");
    });

    it("should clear calculation", () => {
        render(<App />);
        const clickArray = ["1", "c"];
        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });

        expect(screen.getByTestId("calculation")).toHaveTextContent("0");
    });

    it("should show 5+7 on Screen when I click on 5+7", () => {
        render(<App />);

        const clickArray = ["5", "+", "7"];
        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
        expect(screen.getByTestId("calculation")).toHaveTextContent("5+7");
    });

    it("should show 5X7 on Screen when I click on 5x7 ", () => {
        render(<App />);
        const clickArray = ["5", "x", "7"];
        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
        expect(screen.getByTestId("calculation")).toHaveTextContent("5x7");
    });

    it("should show 5/7 on Screen when I click on 5/7", () => {
        render(<App />);

        const clickArray = ["5", "/", "7"];
        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
        expect(screen.getByTestId("calculation")).toHaveTextContent("5/7");
    });

    it("should show 5+(7x4) on Screen when I click on 5 + (7x4", () => {
        render(<App />);

        const clickArray = ["5", "+", "(", "7", "x", "4"];

        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
        expect(screen.getByTestId("calculation")).toHaveTextContent("5+(7x4)");
    });

    it("should show 5+(7x4(3+5)) on Screen when I click on 5+(7x4(3+5", () => {
        render(<App />);
        const clickArray = ["5", "+", "(", "7", "x", "4", "(", "3", "+", "5"];

        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });

        expect(screen.getByTestId("calculation")).toHaveTextContent("5+(7x4(3+5))");
    });

    it("should show 5+(7x4(3+5)7+1) on Screen when I click on 5+(7x4(3+5)7+1", () => {
        render(<App />);
        const clickArray = ["5", "+", "(", "7", "x", "4", "(", "3", "+", "5", ")", "7", "+", "1"];

        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });

        expect(screen.getByTestId("calculation")).toHaveTextContent("5+(7x4(3+5)7+1)");
    });

    it("should show 5+(7x4(3+5)7+1))+4 on Screen when I click on 5+(7x4(3+5)7+1)+4", () => {
        render(<App />);
        const clickArray = [
            "5",
            "+",
            "(",
            "7",
            "x",
            "4",
            "(",
            "3",
            "+",
            "5",
            ")",
            "7",
            "+",
            "1",
            ")",
            "+",
            "4",
        ];

        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
        expect(screen.getByTestId("calculation")).toHaveTextContent("5+(7x4(3+5)7+1)+4");
    });

    it("should return calculation", async () => {
        const fakeCalculation = "14";
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeCalculation),
            })
        );
    
        
        render(<App />);
        
        const clickArray = ["5", "+", "7",'enter'];
        clickArray.forEach((value) => {
            fireEvent.click(screen.getByTestId(value));
        });
    
        await waitFor(() => {
            expect(screen.getByTestId("calculation")).toHaveTextContent("14");
        })
     
    });

});


