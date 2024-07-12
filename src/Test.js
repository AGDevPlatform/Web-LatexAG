.then(() => {
  toast.success("All content has been copied successfully !");
})
.catch((err) => {
  console.error("Failed to copy text: ", err);
});