function Footer() {
  return (
    <footer
      className="mx-auto w-full max-w-container px-2 sm:px-6 lg:px-3"
      style={{ zIndex: 1000, backgroundColor: "gray" }}
    >
      <div className="border-t border-slate-900/5 py-1">
        <p className="text-center text-sm leading-6 text-slate-500">
          © 2024 Nguyen Duong The Vi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
