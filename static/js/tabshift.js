$(function () {

	var $ul = $("ul");
	var li_template = $("#li_template").template();

	$.get("/tabs/", function (tabs) {
		_(tabs)
			.values()
			.sort(function (a, b) {
				return a.windowId != b.windowId ? a.windowId - b.windowId : a.index - b.index;
			})
			.forEach(function (tab) {
				$ul.append($.tmpl(li_template, tab));
			});
	});

});
