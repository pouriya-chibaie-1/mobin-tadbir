import { useEffect, useState } from "react";
import rightArrow from "../assets/icon/arrow-right-black.svg";
import plus from "../assets/icon/plus.svg";
import edit from "../assets/icon/edit.svg";
import forward from "../assets/icon/forward.svg";
import closeX from "../assets/icon/close-x.svg";
import trash from "../assets/icon/trash-question.svg";
import { Modal } from "flowbite-react";
import CustomButton from "../components/shared/Button";

const Task = () => {
  const [openModal, setOpenModal] = useState({ isOpen: false, index: 0 });
  const [questions, setQuestions] = useState([
    {
      question: "بهترین بازیکن بازي ايران قطر از نظر شما كيست؟",
      awnsers: ["مهدی طارمی", "مهدی طارمی", "مهدی طارمی", "مهدی طارمی"],
    },
  ]);
  const [open, setOpen] = useState<number | "">();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswers, setNewAnswers] = useState([""]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
        }
      } catch (error) {
        console.error("Failed to parse questions from localStorage", error);
      }
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleAddQuestion = () => {
    if (
      newAnswers.length === 0 ||
      newAnswers.some((answer) => answer.trim() === "")
    ) {
      alert("پاسخ‌ها نمی‌توانند خالی باشند.");
      return;
    }

    const newQuestionData = {
      question: newQuestion,
      awnsers: newAnswers,
    };
    const updatedQuestions = [...questions, newQuestionData];
    setQuestions(updatedQuestions);
    setNewQuestion("");
    setNewAnswers([""]);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleEditQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: newQuestion,
      awnsers: newAnswers,
    };
    setQuestions(updatedQuestions);
    setOpenModal({ isOpen: false, index: 0 });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleAddAnswer = () => {
    setNewAnswers([...newAnswers, ""]);
  };

  const handleDeleteAnswer = (index: number) => {
    const updatedAnswers = newAnswers.filter((_, i) => i !== index);
    setNewAnswers(updatedAnswers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...newAnswers];
    updatedAnswers[index] = value;
    setNewAnswers(updatedAnswers);
  };

  return (
    <>
      <div
        style={{ direction: "rtl" }}
        className="w-full flex justify-between mb-6"
      >
        <div className="flex gap-2 w-fit text-lg text-[#14142A]">
          <img src={rightArrow} />
          لیست الگو{" "}
        </div>
        <div
          className="text-secondary-color flex gap-2 items-center cursor-pointer"
          onClick={() => setOpenModal({ isOpen: true, index: -1 })}
        >
          <img src={plus} className="w-4 h-4" />
          افزودن الگو{" "}
        </div>
      </div>

      <div className="flex flex-col">
        {questions?.map((question, index) => (
          <div key={index} className="flex flex-col rounded-lg">
            <div
              onClick={() => setOpen(index === open ? "" : index)}
              className={`h-14 cursor-pointer px-6 py-4 w-full ${index % 2 === 0 ? "bg-[#F7F7FC]" : "bg-white"} text-[#14142A] rounded-lg flex justify-between items-center`}
            >
              <div className="text-lg font-semibold text-[#14142A] mb-2 overflow-hidden">
                {question.question}
              </div>
              <div className="flex gap-4">
                <img
                  src={edit}
                  alt="edit"
                  onClick={() => {
                    setOpenModal({ isOpen: true, index });
                    setNewQuestion(question.question);
                    setNewAnswers(question.awnsers);
                  }}
                  className="w-6 h-6 cursor-pointer"
                />
                <img
                  src={trash}
                  alt="trash"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
                <img
                  src={forward}
                  alt="forward"
                  className={`w-6 h-6 cursor-pointer ${index === open ? "rotate-180 transition-all duration-200" : ""}`}
                />
              </div>
            </div>
            <div
              className={`w-full flex flex-col gap-2 ${index % 2 === 0 ? "bg-[#F7F7FC]" : "bg-white"} pb-4 px-6 overflow-hidden transition-all duration-500 ease-in-out ${index === open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              {question.awnsers?.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="w-full p-3 text-[#4E4B66] flex items-center rounded-[4px] border border-[#C9C3D9] h-10"
                >
                  {answer}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={openModal.isOpen}
        onClose={() => setOpenModal({ isOpen: false, index: 0 })}
        dir="rtl"
      >
        <Modal.Body className="p-4">
          <div className="w-full flex justify-between text-xl font-bold text-[#14142A] mb-6">
            <span>
              {openModal.index === -1 ? "افزودن سوال جدید" : "ویرایش نظرسنجی"}
            </span>
            <img
              src={closeX}
              alt="close"
              onClick={() => setOpenModal({ isOpen: false, index: 0 })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1 items-center">
              <span className="font-bold text-[#14142A]">سوال</span>
              <input
                className="w-full h-12 border-[1.5px] rounded-[10px] p-2 border-[#D9DBE9]"
                placeholder="سوال"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <div className="font-bold text-[#14142A] mb-4">پاسخ ها</div>
              {newAnswers.map((answer, i) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <input
                    className="w-full h-12 border-[1.5px] rounded-[10px] p-2 border-[#D9DBE9] "
                    placeholder={`پاسخ ${i + 1}`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                  />
                  <CustomButton
                    onClick={() => handleDeleteAnswer(i)}
                    color="errorColor"
                    outline
                    extendedClass="h-12"
                  >
                    حذف{" "}
                  </CustomButton>
                </div>
              ))}
              <CustomButton
                outline
                color="secondaryColor"
                extendedClass="border-[1.5px] border-dashed text-secondary-color border-secondary-color w-full h-12 rounded-[10px] flex-center gap-2 mt-4"
                onClick={handleAddAnswer}
              >
                <img src={plus} alt="add" className="w-6 h-6 ml-2" />
                افزودن پاسخ جدید
              </CustomButton>
            </div>
            <div className="flex gap-4 mt-4">
              <CustomButton
                extendedClass="w-1/4"
                onClick={() => {setOpenModal({ isOpen: false, index: 0 });setNewAnswers([]);setNewQuestion("")}}
                outline
                color="errorColor"
              >
                انصراف
              </CustomButton>
              <CustomButton
                extendedClass="w-3/4"
                color="primaryColor"
                disabled={
                  newAnswers.length === 0 ||
                  newAnswers.some((answer) => answer.trim() === "")
                }
                onClick={() =>
                  openModal.index === -1
                    ? handleAddQuestion()
                    : handleEditQuestion(openModal.index)
                }
              >
                {openModal.index === -1 ? "افزودن سوال" : "ویرایش سوال"}
              </CustomButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Task;