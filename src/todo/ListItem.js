import React from "react";
// 리액트 기본 아이콘 로드
// https://react-icons.github.io/react-icons/icons?name=md
import {
  MdStar,
  MdStarBorder,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdModeEdit,
  MdRemoveCircleOutline,
} from "react-icons/md";
// node-sass 모듈의 조건부 CSS 적용 및 렌더링 기능 추가
import cn from "classnames";
import "../css/ListItem.scss";
const ListItem = ({
  todo,
  onRemove,
  onToggleOfImportant,
  onToggleOfComplete,
  onToggleOfEdit,
}) => {
  const { todoId, content, startDate, important, complete } = todo;
  console.log("투두", todo)
  return (
    <div className="list-item">
      <div className="stealth">{startDate}</div>
      <div
        className={cn("important-check", { important })}
        onClick={() => onToggleOfImportant(todoId)}
      >
        {important ? <MdStar /> : <MdStarBorder />}
      </div>
      <div
        className={cn("complete-check", { complete })}
        onClick={() => onToggleOfComplete(todoId)}
      >
        <div className="content">{content}</div>
        {complete ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </div>
      <div className="edit" onClick={() => onToggleOfEdit(todoId)}>
        <MdModeEdit />
      </div>
      <div className="remove" onClick={() => onRemove(todoId)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};
export default React.memo(ListItem);
