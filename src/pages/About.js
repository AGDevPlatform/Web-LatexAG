function About() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="  rounded-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-blue-500">Latex AG</h1>
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg">Trang Web hỗ trợ soạn thảo công thức Latex.</p>

          <p>
            Latex Vật Lý 31415:
            <a
              href="https://www.facebook.com/latexvatly31415/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              https://www.facebook.com/latexvatly31415/
            </a>
          </p>

          <p>
            Email:{" "}
            <a
              href="mailto:latexvatly31415@gmail.com"
              className="text-blue-600 hover:underline"
            >
              latexvatly31415@gmail.com
            </a>
          </p>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Copyright &copy; 2024 Latex AG. All right reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
