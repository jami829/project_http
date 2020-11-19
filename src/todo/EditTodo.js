import React, { useState, useCallback } from "react";
import { MdModeEdit } from "react-icons/md";
import Button from "../css/Button";

const EditTodo = ({ editContent }) => {
  const [editedOne, setEditedOne] = useState({ content: "", err: "" });

  const onChange = (e) => {
    setEditedOne({ [e.target.key]: e.target.value });
  };

  const onSubmit = useCallback(
    (e) => {
      if (editedOne.content === "") {
        setEditedOne({ err: "고칠게 없는가..." });
      } else {
        editContent(editedOne); // ToDo 컴포넌트에 수정내용 반영
        setEditedOne({ content: "", err: "" }); // 입력폼 초기화
        e.preventDefault(); // submit 이벤트로 인한 새로고침 방지
      }
    },
    [editContent, editedOne]
  );

  return (
    <>
      <div className="modal hidden">
        <div className="modal_overlay"></div>
        {/* <div className="modal_content"> */}
        <div className="modal_content">
          <form className="edit-todo" onSubmit={onSubmit}>
            <input
              className="editedOne"
              placeholder="글을 수정해주세요"
              name="content"
              value={editedOne.content}
              onChange={onChange}
            ></input>
            <Button type="submit">
              <MdModeEdit />
            </Button>
          </form>
        </div>
      </div>
      <div>{editedOne.err !== "" ? editedOne.err : null}</div>
    </>
  );
};

export default EditTodo;
