// tabコンテンツの高さを最大値にそろえる
$(function() {
	$('#newsTabIndex').tabs({
		fxAutoHeight: true,
		fxShow: {
			height: 'show',
			opacity: 'show'
		},
		fxSpeed: 'normal'
	});
});

