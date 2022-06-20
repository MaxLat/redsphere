import logo from "./logo.svg";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import { Button, SimpleGrid } from "@mantine/core";
import { useCallback, useState } from "react";

const btnValues = [
    ["C", "(", ")", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, "."],
];

function App() {
    const btns = [
        {
            value: "C",
            function: (event) => clearCalculation(event),
            id : 'C'
        },
        {
            value: "(",
            function: (event) => addParenthese(event),
            id : '('
        },
        {
            value: ")",
            function: (event) => closeOpenParenthese(event),
            id : ')'
        },
        {
            value: "/",
            function: (event) => onDivider(event),
            id : '/'
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
            id : 'x'
        },
        {
            value: "+",
            function: (event) => onAddition(event),
            id : '+'
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
            value: "-",
            function: (event) => onSubtrack(event),
            id : '-'
        },
        {
            value: "3",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "2",
            function: (event) => addNumberInCalculation(event),
        },
        {
            value: "1",
            function: (event) => addNumberInCalculation(event),
        },
    ];

    let [calc, setCalc] = useState({
        num: 0,
        res: 0,
        parenthese: [],
    });

    function clearCalculation(event) {
        setCalc({
            num: 0,
            res: 0,
            parenthese : []
        });
    }

    const addCharacter = (value) => {

        const isInParenthese = calc.parenthese.find(parenthse => parenthse === true);
        if(!isInParenthese){
            setCalc({ ...calc, num: calc.num + value });
            return
        }
        const fullCalculation = addInParenthese(value)
        setCalc({ ...calc, num: fullCalculation });

    }

    const addNumberInCalculation = (e) => {
        if (calc.num === 0) {
            setCalc({ ...calc, num: e.target.textContent });
            return;
        }
        addCharacter(e.target.textContent)
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
            if (i ===  index) {
                fullCalculation +=  value;
            }

            fullCalculation += splitted[i];
        }

        return fullCalculation;

    } 

    const onAddition = (event) => {
        const [lastString,indexLastString] = getLastString();

        if (lastString === "+") {
            return;
        }

         const isTrade = trade(["*", "/", "-", "X", "x"], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent)
    };

    const getLastString = () => {
        let index = 1;
        while (calc.num[calc.num.length - index] === ')'){
            index++;
        }
        
        return [calc.num[calc.num.length - index],index]
    }

    const onSubtrack = (event) => {
        const [lastString,indexLastString] = getLastString();

        if (lastString === "-") {
            return;
        }

        const isTrade = trade(["*", "/", "+", "X", "x"], lastString, event,indexLastString);

        if (isTrade) {
            return;
        }

        addCharacter(event.target.textContent)
    };

    const onMultiply = (event) => {
        const [lastString,indexLastString] = getLastString();
        if (["*", "X", "x"].includes(lastString)) {
            return;
        }

        const isTrade = trade(["-", "/", "+"], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }
        
        addCharacter(event.target.textContent)

    };

    const onDivider = (event) => {
        const [lastString,indexLastString] = getLastString();
        if (["/"].includes(lastString)) {
            return;
        }

        const isTrade = trade(["-", "*", "+", "X", "x"], lastString, event, indexLastString);

        if (isTrade) {
            return;
        }
        
        addCharacter(event.target.textContent)
    };

    const addParenthese = (event) => {
        if (calc.num === 0) {
            setCalc({ ...calc, num: "()", parenthese: [...calc.parenthese, true] });
            return;
        }

        const isInParenthese = calc.parenthese.find(parenthse => parenthse === true);
        if(!isInParenthese){
            setCalc({ ...calc, num: calc.num + "()", parenthese: [...calc.parenthese, true] });
            return
        }

        const fullCalculation = addInParenthese('()')
        setCalc({ ...calc, num: fullCalculation , parenthese: [...calc.parenthese, true] });
    };

    const closeOpenParenthese = (event) => {

        const isInParenthese = calc.parenthese.find(parenthse => parenthse === true);
        if(calc.parenthese.length === 0 || !isInParenthese){
            return;
        }


        const index = calc.parenthese.lastIndexOf(true);
        let newArray = [...calc.parenthese];
        newArray[index] = false;
        setCalc({...calc, parenthese : newArray})



    }

    const trade = (arrayOperand, lastString, event , indexLastString) => {
        if (arrayOperand.includes(lastString)) {
            setCalc({ ...calc, num: calc.num.substring(0, calc.num.length - indexLastString) + event.target.textContent + calc.num.substring(calc.num.length - indexLastString + 1) });
            return true;
        }

        return false;
    };

    const getCalculation = useCallback(async () => {
        //setQuote(state => ({ data: state.data, loading: true }));

        if (!calc.num) {
            return;
        }
        let calcToSend = calc.num.replace(/[x|X]/g, "*");
        try {
            const rawResponse = await fetch("http://localhost:4000/api/calculate", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ calcul: calcToSend }),
            });
            const content = await rawResponse.json();
            setCalc({ num: 0, res: content });
        } catch (error) {
            console.log(error);
        }
    }, [calc]);

    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res}></Screen>
            <div className="container">
                {btns.map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            onClick={(event) => btn.function(event)}
                            variant="outline"
                            color="red"
                            radius="xl"
                            size="lg"
                            data-testid={ btn.id ? btn.id : btn.value }
                        >
                            {btn.value}
                        </Button>
                    );
                })}

                <div className="child equal-button">
                    <Button
                        variant="outline"
                        onClick={getCalculation}
                        color="red"
                        radius="xl"
                        size="lg"
                        data-testid='enter'

                    >
                        Enter
                    </Button>
                </div>
            </div>
        </Wrapper>
    );
}

export default App;
