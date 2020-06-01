//let: ECMAScript2015から採用された、変数の宣言。再代入はできるが、再宣言ができない。
//「let login = (event) => {}」＝「let login = function(event){}」
let login = (event) => {
	event.preventDefault();
	let jsonString = {
			'userName': $('input[name=userName]').val(),
			'password': $('input[name=password]').val()
	};
	//jqueryのajaxを呼び出し、IndexController内のloginメソッドにアクセス
	/*ajax: JavaScriptでWebページを切り替えずにサーバーとデータをやりとりすること。
			サーバーから必要な情報だけを取得して、ページの一部だけを更新できる。*/
	$.ajax({
		type: 'POST',
		/*「/api/」の前の部分に対応するコントローラ(今回はIndexController)内の、
		「loginApi」メソッドを意味する*/
		url: '/ecsite/api/login',
		data: JSON.stringify(jsonString),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	//thenメソッドのコールバックで
	.then((result) => {
			let user = JSON.parse(result);
			$('#welcome').text(` -- ようこそ！ ${user.fullName} さん`);
			$('#hiddenUserId').val(user.id);
			$('input[name=userName]').val('');
			$('input[name=password]').val('');
		}, () => {
			console.error('Error: ajax connection failed.');
		}
	);
};

let addCart = (event) => {
	//event.target内、(親要素).(親要素)の上にある「td」をさがす
	let tdList = $(event.target).parent().parent().find('td');
	
	let id = $(tdList[0]).text();
	let goodsName = $(tdList[1]).text();
	let price = $(tdList[2]).text();
	let count = $(tdList[3]).find('input').val();
	
	if(count === '0' || count === ''){
		alert('注文数が0または空欄です。')
		return;
	}
	
	let cart = {
			'id': id,
			'goodsName': goodsName,
			'price': price,
			'count': count,
	};
	cartList.push(cart);
	
	let tbody = $('#cart').find('tbody');
	$(tbody).children().remove();
	cartList.forEach(function(cart, index){
		let tr = $('<tr />');
		
		$('<td />', { 'text': cart.id }).appendTo(tr);
		$('<td />', { 'text': cart.goodsName }).appendTo(tr);
		$('<td />', { 'text': cart.price }).appendTo(tr);
		$('<td />', { 'text': cart.count }).appendTo(tr);
		let tdButton = $('<td />');
		$('<button />',{
			'text': 'カート削除',
			'class': 'removeBtn',
		}).appendTo(tdButton);
		
		$(tdButton).appendTo(tr);
		$(tr).appendTo(tbody);
	});
	$('.removeBtn').on('click', removeCart);
	
};

let buy = (event) => {
	$.ajax({
		type: 'POST',
		url: '/ecsite/api/purchase',
		data: JSON.stringify({
			"userId": $('#hiddenUserId').val(),
			"cartList": cartList
		}),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	.then((result) =>{
			alert('購入しました。');
			}, () => {
				console.error('Error: ajax connection failed.');
			}
		);
};

let removeCart = (event) => {
	const tdList = $(event.target).parent().parent().find('td');
	let id = $(tdList[0]).text();
	cartList = cartList.filter(function(cart){
		return cart.id !== id;
	});
	$(event.target).parent().parent().remove();
};

let showHistory = () =>{
	$.ajax({
		type: 'POST',
		url: '/ecsite/api/history',
		data: JSON.stringify({ "userId": $('#hiddenUserId').val() }),
		contentType: 'application/json',
		datatype: 'json',
		scriptCharset: 'utf-8'
	})
	.then((result) => {
			let historyList = JSON.parse(result);
			let tbody = $('#historyTable').find('tbody');
			$(tbody).children().remove();
			historyList.forEach((history, index) => {
				let tr = $('<tr _>');
				
				$('<td />', { 'text': history.goodsName }).appendTo(tr);
				$('<td />', { 'text': history.itemCount }).appendTo(tr);
				$('<td />', { 'text': history.createdAt }).appendTo(tr);
				
				$(tr).appendTo(tbody);
			});
			$("#history").dialog("open");
		}, () => {
			console.error('Error: ajax connection failed.');
		}
	);
};