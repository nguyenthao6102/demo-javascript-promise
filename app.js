// 1. Event listener --> OK
// 2. JSON --> OK
//		- Ứng dụng trong thực tế của JSON?
// 3. Promise
//		- Sync --> OK
// 		- Async --> OK
// 		- Nỗi đau(pain) --> OK
//		- Lý thuyết, cách hoạt động --> OK
// 			-- Các trạng thái của promise
// 				+ 1. Pendding
//				+ 2. Fulfilled
//				+ 3. Rejected
// 			-- Promise methods(resolve, reject, all)
// 				+ 1. Promise.resolve
// 				+ 2. Promise.reject
// 				+ 3. Promise.all
//		- Thực hành, ví dụ
//		- Ứng dụng thực tế của Promise?
// 4. Fetch
// 5. DOM location
// 6. Local storage
// 7. Session storage
// 8. Coding convention
// 9. Best Practices
// 10. Mistakes
// 11. Perfomance

// 	Trả lời phỏng vấn về promise
// 	Promise là một khái niệm sinh ra để xử lý những thao tác bất đồng bộ.
// 	Trước khi có promise, chúng ta thường sử dụng callback.
//  Callback thường xảy ra một vấn đề là callback hell, code bị lồng nhau nhiều lớp khiến ta khó nhìn.
// 	Promise được sinh ra từ phiên bản javascript ES6
//  Và chúng ta cả thể sử dụng promise để khắc phục tình trạng callback hell
//	Giúp code chúng ta dễ đọc dễ hiểu hơn
// 	Để tạo ra một promise, ta sử dụng từ khóa new Promise
// 	Bên trong Promise ta truyền vào một Executor function
// 	Trong executor function nhận được 2 tham số dạng hàm resolve và reject
//	Ta gọi resolve() khi thao tác xử lý logic của ta thành công
// 	Ta gọi reject() khi thao tác xử lý logic của ta thất bại
//	Khi xử dụng promise ta sử dụng phương thức .then và .catch
//  .then xảy ra khi resolve()
// 	.catch xảy ra khi reject()
var users = [
	{
		id: 1,
		name: "Kien Dam",
	},
	{
		id: 2,
		name: "Son Dang",
	},
	{
		id: 3,
		name: "Hung Dam",
	},
];

var comments = [
	{
		id: 1,
		user_id: 1,
		content: "Anh Son chua ra video :(",
	},
	{
		id: 2,
		user_id: 2,
		content: "Vua ra xong em oi!",
	},
	{
		id: 3,
		user_id: 1,
		content: "Cam on anh!",
	},
];

// 1. Lấy comments
// 2. Từ comments lấy ra user_id
// 3. Từ user_id lấy ra user tương ứng

// Fake API

function getComments() {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(comments);
		}, 1000);
	});
}

function getUsersByIds(userIds) {
	return new Promise(function (resolve) {
		var result = users.filter(function (user) {
			return userIds.includes(user.id);
		});
		setTimeout(function () {
			resolve(result);
		}, 1000);
	});
}
getComments()
	.then(function (comments) {
		var userIds = comments.map(function (comment) {
			return comment.user_id;
		});
		return getUsersByIds(userIds).then(function (users) {
			return {
				users: users,
				comments: comments,
			};
		});
	})
	.then(function (data) {
		var commentBlock = document.getElementById("comment-block");

		var html = "";
		data.comments.forEach(function (comment) {
			var user = data.users.find(function (user) {
				return user.id === comment.user_id;
			});
			html += `<li>${user.name}: ${comment.content}</li>`;
		});
		commentBlock.innerHTML = html;
	});
