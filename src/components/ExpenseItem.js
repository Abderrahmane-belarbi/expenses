import { useState } from "react";
import "./ExpenseItem.css";
import TrashIcon from "../assets/icons/trash-solid.svg";
import EditIcon from "../assets/icons/edit-solid.svg";

export default function ExpenseItem({
  expenseObject,
  price,
  amount,
  //date,
  plawatListObject,
  isPaid,
  inputPaidPart,
  handeDeleteExpense,
}) {
  //const day = date.toLocaleString("en-US", { day: "2-digit" });
  //const month = date.toLocaleString("en-US", { month: "long" });
  //const year = date.getFullYear();
  const [localAmount, setAmount] = useState(amount);

  let different = Number(price) - Number(inputPaidPart)

  function clickHandler() {
    setAmount("Updated");
  }
  return (
    <div className="expense-item">
      <div className="expense-item_basic_info">
        <div className="expense-item__description">
          <div className="expense-item__description_date_amount">
            <h2>{localAmount}</h2>
            <div className="expense-date">
              {/* <div className="expense-date__day">{day}</div>
              <div className="expense-date__month">{month}</div>
              <div className="expense-date__year">{year}</div> */}
            </div>
          </div>
          <div className="expense-item__price">{price} DZ</div>
        </div>
        <div className="expense-item__div_buttons">
          <img
            className="expense-item__icon"
            alt="editIcon"
            src={EditIcon}
            onClick={clickHandler}
          ></img>
          <img
            className="expense-item__icon"
            alt="trashIcon"
            src={TrashIcon}
            onClick={()=> handeDeleteExpense(expenseObject)}
          ></img>
        </div>
      </div>
      <div className="expense-item_extra_info">
        <div className="extra_info_is_paid_info_div">
          <label>{ isPaid || different === 0 ? 'Balanced: Yes' : null}</label>
        </div>
        <div className="extra_info_paid_part_div">
          <label>
            {isPaid || different === 0 ? null : (
              
              <p>{different > 0 ? `Remaining payment: ${different}DZ`: `above payment: ${-different}DZ`}</p>
            )}
          </label>
        </div>
        <div className="extra_info_plawat_list_div">
          <div className="extra_info_plawat_list_header">
            <h2>Plawat:</h2>
          </div>
          {plawatListObject.map((pla, key) => (
            <div key={key} className="extra_info_pla_div">
              <p className="extra_info_pla_name">- {pla.plaName}</p>
              <p>{pla.plaQnt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
