import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import cn from "classnames";
import "../css/ListImportantFiltered.scss";

const ListImportantFiltered = ({ todo }) => {
  const { content, complete } = todo;
  return (
    <div className="list-important-item">
      {/* 완료버튼 */}
      <div className={cn("complete-check-ofImportant", { complete })}>
        {complete ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="content">{content}</div>
      </div>
    </div>
  );
};
// 컴포넌트의 props가 바뀌지 않았다면 re-rendering 방지(= shouldComponentUpdate와 동일)
export default React.memo(ListImportantFiltered);
