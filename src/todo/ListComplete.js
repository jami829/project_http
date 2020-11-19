import React from "react";
import { MdStar, MdStarBorder } from "react-icons/md";
import cn from "classnames";
import "../css/ListCompleteFiltered.scss";

const ListCompleteFiltered = ({ todo }) => {
  const { important, content } = todo;
  return (
    <div className="list-complete-item">
      {/* 중요버튼 */}
      <div className={cn("important-check-ofComplete", { important })}>
        {important ? <MdStar /> : <MdStarBorder />}
        <div className="content">{content}</div>
      </div>
    </div>
  );
};
// 컴포넌트의 props가 바뀌지 않았다면 re-rendering 방지(= shouldComponentUpdate와 동일)
export default React.memo(ListCompleteFiltered);
