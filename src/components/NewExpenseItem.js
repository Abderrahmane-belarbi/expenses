import { useState } from "react";
import PlusIcon from "../assets/icons/plus-solid.svg";
import MinusIcon from "../assets/icons/minus-solid.svg";
import TrashIcon from "../assets/icons/trash-solid.svg";

export default function NewExpenseItem({ onSaveExpense }) {
  const [inputAmount, setInputAmount] = useState("");
  const initialDate = `${new Date().getFullYear()}-${addZero(new Date().getMonth() + 1)}-${addZero(new Date().getDate())}`
  const [inputDate, setInputDate] = useState(initialDate);
  const [plawatListObject, setPlawatListObject] = useState([]);
  const [inputIsPaid, setInputIsPaid] = useState(true);
  const [inputPaidPart, setInputPaidPart] = useState(0);

  function addZero(value){
    if((value + '').length < 2){
        return value = '0' + value;
    } else {
        return value;
    }
  }
  function amountChangeHandler(event) {
    setInputAmount(Number(event.target.value));
  }
  function dateChangeHandler(event) {
    setInputDate(event.target.value);
  }
  function inputIsPaidChangeHandler() {
    setInputIsPaid(!inputIsPaid);
  }
  function setInputPaidPartChangeHandler(event) {
    if(event.target.value >= 0){
      setInputPaidPart(event.target.value);
    }
  }
  function selectedPlawatListChangeHandler(event) {
    if(event.target.value !== 'Nothing'){
      setPlawatListObject([
        { plaName: event.target.value, plaQnt: 1 },
        ...plawatListObject,
      ]);
    }
  }
  
  function submitHandler(event) {
    event.preventDefault();
    if (!inputAmount) {
      return;
    }

    const expenseData = {
      amount: inputAmount,
      date: new Date(inputDate),
      plawatListObject: plawatListObject,
      inputIsPaid: inputIsPaid,
      inputPaidPart: inputPaidPart,
    };

    setInputAmount("");
    setInputDate(initialDate);
    setPlawatListObject([]);
    setInputPaidPart('');
    setInputIsPaid(true);
    onSaveExpense(expenseData);
  }
  
  return (
    <div className="newExpenseItem_form_div">
      <form className="newExpenseItem_form" onSubmit={submitHandler}>
        <div className="newExpenseItem_form">
          <div className="newExpenseItem_form_amount">
            <label>Amount</label>
            <input
              className="newExpenseItem_form__input"
              type="number"
              min="1"
              step="1"
              onChange={amountChangeHandler}
              value={inputAmount}
            />
          </div>
          <div className="newExpenseItem_form_date">
            <label>Date</label>
            <input
              className="newExpenseItem_form__input"
              type="date"
              min="2019-01-01"
              max="2024-12-31"
              onChange={dateChangeHandler}
              value={inputDate}
            />
          </div>
          <div className="newExpenseItem_form_selection_item_div">
            <label className="newExpenseItem_form_selection_item_label">
              Item
            </label>
            <select
              className="newExpenseItem_form_selection_item_select"
              id="selectPla"
              name="selectPla"
              defaultValue="Nothing"
              onChange={selectedPlawatListChangeHandler}
            >
              <option value="Nothing">Nothing</option>
              <option value="PlaByadKbir">PlaByadKbir</option>
              <option value="PlaMilfay">PlaMilfay</option>
              <option value="PlaMa9rod">PlaMa9rod</option>
              <option value="PlaChamiyaS">PlaChamiyaS</option>
              <option value="PlaMdawr">PlaMdawr</option>
              <option value="BoitGreen">BoitGreen</option>
              <option value="BoitMov">BoitMov</option>
              <option value="BoitRoz">BoitRoz</option>
              <option value="BoitTransparent">BoitTransparent</option>
            </select>
            <PlawatList
              plawatListObject={plawatListObject}
              setPlawatListObject={setPlawatListObject}
            />
          </div>
          <div className="newExpenseItem_form_isItpaid_div">
            <label>Balanced</label>
            <input
              className="newExpenseItem_form__input_checkbox"
              type="checkbox"
              checked={inputIsPaid}
              onChange={inputIsPaidChangeHandler}
            ></input>
          </div>
          {!inputIsPaid && (
            <div className="newExpenseItem_form_remainingPaid_div">
              <label>Paid part</label>
              <input
                className="newExpenseItem_form__input"
                type="number"
                value={inputPaidPart}
                onChange={setInputPaidPartChangeHandler}
              ></input>
              <label>DZ</label>
            </div>
          )}
        </div>
        <div className="newExpenseItem_form_button_div">
          <button
            className="newExpenseItem_form_button"
            onClick={submitHandler}
          >
            Add Expenses
          </button>
        </div>
      </form>
    </div>
  );
}

function PlawatList({ plawatListObject, setPlawatListObject }) {
  return (
    <ul className="newExpenseItem_form_selection_items_list">
      {plawatListObject.map((pla, key) => (
        <PlawatListNewExpense
          key={key}
          pla={pla}
          plawatListObject={plawatListObject}
          setPlawatListObject={setPlawatListObject}
        />
      ))}
    </ul>
  );
}

function PlawatListNewExpense({ plawatListObject, pla, setPlawatListObject }) {
  function inputPlawatQntChangeHandler(event) {
    plawatListObject.map((plaObject) => {
      if (pla === plaObject) {
        let tempPlawatListObject = plawatListObject;
        const index = tempPlawatListObject.indexOf(plaObject);
        let tempPlaObj = { plaName: pla.plaName, plaQnt: event.target.value };
        tempPlawatListObject.splice(index, 1, tempPlaObj); // replace the of index that its in first parameter
        // and the secound its that we want to delete one element
        // and replace it with element 'tempPlaObj'
        setPlawatListObject([...tempPlawatListObject]);
      }
      return plawatListObject; // i did return just to avoid the borning warning in the console
    });
  }
  function handlePlusQnt() {
    plawatListObject.map((plaObject) => {
      if (pla === plaObject) {
        let tempPlawatListObject = plawatListObject;
        const index = tempPlawatListObject.indexOf(plaObject);
        let tempPlaObj = { plaName: pla.plaName, plaQnt: pla.plaQnt + 1 };
        tempPlawatListObject.splice(index, 1, tempPlaObj); // replace the of index that its in first parameter
        setPlawatListObject([...tempPlawatListObject]);
      }
      return plawatListObject; // i did return just to avoid the borning warning in the console
    });
  }
  function handleMinusQnt() {
    plawatListObject.map((plaObject) => {
      if (pla === plaObject) {
        let tempPlawatListObject = plawatListObject;
        const index = tempPlawatListObject.indexOf(plaObject);
        let tempPlaObj = { plaName: pla.plaName, plaQnt: pla.plaQnt > 1 ? pla.plaQnt - 1 : pla.plaQnt};
        tempPlawatListObject.splice(index, 1, tempPlaObj); // replace the of index that its in first parameter
        setPlawatListObject([...tempPlawatListObject]);
      }
      return plawatListObject; // i did return just to avoid the borning warning in the console
    });
  }
  function handleDeletePla(){
    plawatListObject.map((plaObject) => {
      if (pla === plaObject) {
        let tempPlawatListObject = plawatListObject;
        const index = tempPlawatListObject.indexOf(plaObject);
        tempPlawatListObject.splice(index, 1); // replace the of index that its in first parameter
        setPlawatListObject([...tempPlawatListObject]);
      }
      return plawatListObject; // i did return just to avoid the borning warning in the console
    });
  }

  return (
    pla.plaName !== 'Nothing' && <li className="newExpenseItem_form_selection_item_li">
      <label className="newExpenseItem_form_selection_item_element">
        {pla.plaName}
      </label>
      <img
        className="newExpenseItem_form_selection_item__icon"
        src={MinusIcon}
        alt="minusIcon"
        onClick={handleMinusQnt}
      />
      <input
        className="newExpenseItem_form_selection_item_input"
        onChange={inputPlawatQntChangeHandler}
        value={pla.plaQnt}
        min={1}
        step={1}
        type="number"
      ></input>
      <img
        className="newExpenseItem_form_selection_item__icon"
        src={PlusIcon}
        alt="plusIcon"
        onClick={handlePlusQnt}
      />
      <img
        className="newExpenseItem_form_selection_item__icon"
        alt="trashIcon"
        src={TrashIcon}
        onClick={handleDeletePla}
      ></img>
    </li>
  );
}
