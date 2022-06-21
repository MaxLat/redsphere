import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import { Button } from "@mantine/core";
import { useCallback, useState, useEffect } from "react";

function App() {
    const btns = [
        {
            value: "C",
            function: (event) => clearCalculation(event),
            id: "c",
        },
        {
            value: "R",
            function: (event) => clearLastCharacter(event),
            id: "r",
        },
        {
            value: ".",
            function: (event) => onAddDot(event),
            id: ".",
        },
        {
            value: "/",
            function: (event) => onDivider(event),
            id: "/",
        },
        {
            value: "7",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "8",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "9",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "x",
            function: (event) => onMultiply(event),
            id: "x",
        },
        {
            value: "4",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "5",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "6",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "+",
            function: (event) => onAddition(event),
            id: "+",
        },
        {
            value: "1",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "2",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "3",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "-",
            function: (event) => onSubtrack(event),
            id: "-",
        },
        {
            value: "0",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "(",
            function: (event) => addParenthese(event),
            id: "(",
        },
        {
            value: ")",
            function: (event) => closeOpenParenthese(event),
            id: ")",
        },
    ];

    let [calc, setCalc] = useState({
        num: "0",
        parenthese: [],
    });

    const handleKeyDown = useCallback(
        (event) => {
            const btn = btns.find((btn) => {
                const id = btn.id ? btn.id : btn.value;
                return id === event.key.toLowerCase();
            });

            if (!btn && event.key !== "Enter") {
                return;
            }

            if (event.key === "Enter") {
                getCalculation();
                return;
            }

            btn.function({ target: { textContent: event.key } });
        },
        [calc]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    function clearCalculation(event) {
        setCalc({
            num: "0",
            parenthese: [],
        });
    }

    const clearLastCharacter = (event) => {
        for (let i = calc.num.length - 1; i >= 0; i--) {
            if (calc.num[i] === ")" && calc.num[i - 1] === "(") {
                const newValue = calc.num.slice(0, i - 1) + calc.num.slice(i + 1);

                if (calc.num.length === 2) {
                    setCalc({ ...calc, num: "0" });
                    break;
                }

                setCalc({ ...calc, num: newValue, parenthese: calc.parenthese.slice(0, -1) });
                break;
            }

            if (calc.num[i] !== ")") {
                if (calc.num.length === 1) {
                    setCalc({ ...calc, num: "0" });
                    break;
                }
                const newValue = calc.num.slice(0, i) + calc.num.slice(i + 1);
                setCalc({ ...calc, num: newValue });
                break;
            }
        }
    };

    const addCharacter = (value) => {
        const isInParenthese = calc.parenthese.find((parenthse) => parenthse === true);
        if (!isInParenthese) {
            setCalc({ ...calc, num: calc.num + value });
            return;
        }
        const fullCalculation = addInParenthese(value);
        setCalc({ ...calc, num: fullCalculation });
    };

    const addNumberInCalculation = (e) => {
        if (calc.num === "0") {
            setCalc({ ...calc, num: e.target.textContent });
            return;
        }
        addCharacter(e.target.textContent);
    };

    const addInParenthese = (value) => {
        let index = 0;
        let splitted = calc.num.split(/(?=\))/g);

        for (let rI = calc.parenthese.length - 1; rI >= 0; rI--) {
            index++;
            if (calc.parenthese[rI]) {
                break;
            }
        }

        let fullCalculation = "";
        for (let i = 0; i <= splitted.length - 1; i++) {
            if (i === index) {
                fullCalculation += value;
            }

            fullCalculation += splitted[i];
        }

        return fullCalculation;
    };

    const onAddition = (event) => {
        const [lastString, indexLastString] = getLastString();

        if (lastString === "+") {
            return;
        }

        const isTrade = trade(["*", "/", "-", "X", "x", "."], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent);
    };

    const onAddDot = (event) => {
        let matches = calc.num.match(/\d+(\.\d+)*/g);
        if (matches && matches.at(-1).includes(".")) {
            return;
        }

        const [lastString, indexLastString] = getLastString();

        if (lastString === ".") {
            return;
        }

        const isTrade = trade(["*", "/", "-", "X", "x", "+"], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent);
    };

    const getLastString = () => {
        let index = 1;
        while (calc.num[calc.num.length - index] === ")") {
            index++;
        }

        return [calc.num[calc.num.length - index], index];
    };

    const onSubtrack = (event) => {
        const [lastString, indexLastString] = getLastString();

        if (calc.num === "0") {
            setCalc({ ...calc, num: "-" });
            return;
        }

        if (lastString === "-") {
            return;
        }

        const isTrade = trade(["*", "/", "+", "X", "x", "."], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent);
    };

    const onMultiply = (event) => {
        const [lastString, indexLastString] = getLastString();
        if (["*", "X", "x"].includes(lastString)) {
            return;
        }

        const isTrade = trade(["-", "/", "+", "."], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent);
    };

    const onDivider = (event) => {
        const [lastString, indexLastString] = getLastString();
        if (["/"].includes(lastString)) {
            return;
        }

        const isTrade = trade(["-", "*", "+", "X", "x", "."], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent);
    };

    const addParenthese = (event) => {
        if (calc.num === "0") {
            setCalc({ ...calc, num: "()", parenthese: [...calc.parenthese, true] });
            return;
        }

        const isInParenthese = calc.parenthese.find((parenthse) => parenthse === true);
        if (!isInParenthese) {
            setCalc({ ...calc, num: calc.num + "()", parenthese: [...calc.parenthese, true] });
            return;
        }

        const fullCalculation = addInParenthese("()");
        setCalc({ ...calc, num: fullCalculation, parenthese: [...calc.parenthese, true] });
    };

    const closeOpenParenthese = (event) => {
        const isInParenthese = calc.parenthese.find((parenthse) => parenthse === true);
        if (calc.parenthese.length === 0 || !isInParenthese) {
            return;
        }

        const index = calc.parenthese.lastIndexOf(true);
        let newArray = [...calc.parenthese];
        newArray[index] = false;
        setCalc({ ...calc, parenthese: newArray });
    };

    const trade = (arrayOperand, lastString, event, indexLastString) => {
        if (arrayOperand.includes(lastString)) {
            setCalc({
                ...calc,
                num:
                    calc.num.substring(0, calc.num.length - indexLastString) +
                    event.target.textContent +
                    calc.num.substring(calc.num.length - indexLastString + 1),
            });
            return true;
        }
        return false;
    };

    const getCalculation = useCallback(async () => {
        if (!calc.num) {
            return;
        }
        let calcToSend = calc.num.replace(/[x|X]/g, "*");
        try {
            const rawResponse = await fetch(`${process.env.REACT_APP_API}/api/calculate`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ calcul: calcToSend }),
            });
            const content = await rawResponse.json();
            setCalc({ ...calc, num: content });
        } catch (error) {
            console.error(error);
        }
    }, [calc]);

    return (
        <div className="flex-container">
            <h1>Super calculator</h1>
            <Wrapper>
                <Screen value={calc.num}></Screen>
                <div className="container">
                    {btns.map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                onClick={btn.function}
                                variant="outline"
                                color="red"
                                radius="xl"
                                size="lg"
                                data-testid={btn.id ? btn.id : btn.value}
                            >
                                {btn.value}
                            </Button>
                        );
                    })}

                    <Button
                        variant="outline"
                        onClick={getCalculation}
                        color="red"
                        radius="xl"
                        size="lg"
                        data-testid="enter"
                    >
                        Enter
                    </Button>

                    <div></div>
                </div>
            </Wrapper>
        </div>
    );
}

export default App;
