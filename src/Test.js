const [inputText, setInputText] = useState(stringInit);
const inputRef = useRef(null);
const iframeRef = useRef(null);
const [isChecked, setIsChecked] = useState(true);
useEffect(() => {
  const savedValue = localStorage.getItem("checkboxState");
  if (savedValue !== null) {
    setIsChecked(JSON.parse(savedValue));
  }
}, []);

const handleChange = (event) => {
  const newValue = event.target.checked;
  setIsChecked(newValue);
  localStorage.setItem("checkboxState", JSON.stringify(newValue));

  if (newValue) {
    toast.success("Bật tự động copy thành công !");
  } else {
    toast.warning("Đã tắt tự động copy !");
  }
};

const handleInputChange = (value) => {
  setInputText(value);
  updateIframeContent(value);
  if (isChecked === true) {
    handleCopy2();
  }
};

const handleCopy2 = () => {
  copyTextToClipboard(inputText)
    .then(() => {})
    .catch((err) => {});
};
