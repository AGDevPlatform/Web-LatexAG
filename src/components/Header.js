function Header() {
  return (
    <div
      style={{
        backgroundColor: "#E5E5E5",
        padding: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          borderWidth: "2px",
          borderColor: "#CCCCCC",
          borderStyle: "solid",
          borderRadius: "5px",
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        {/* <a href="/" style={{ marginRight: "auto" }}>
      Latex AG
    </a> */}
        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <a href="/" style={{ margin: "0 10px", fontWeight: "bold" }}>
            Latex AG
          </a>
          <a href="/" className="hover:underline" style={{ margin: "0 10px" }}>
            Trang chủ
          </a>

          <a href="/" className="hover:underline" style={{ margin: "0 10px" }}>
            Hướng Dẫn
          </a>
          <a
            href="/about"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Giới thiệu
          </a>
          <a
            href="/contact"
            className="hover:underline"
            style={{ margin: "0 10px" }}
          >
            Liên hệ
          </a>
        </div>
      </div>
    </div>
  );
}
export default Header;
