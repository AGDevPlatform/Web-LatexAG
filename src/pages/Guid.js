import React from "react";

function Guid() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className=" p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang cập nhật</h2>
        <p className="text-gray-600">
          Latex AG đang làm việc để mang đến cho bạn trải nghiệm tốt nhất.
        </p>
        <p className="text-gray-600 mt-2">Vui lòng quay lại sau!</p>
      </div>
    </div>
  );
}

export default Guid;
