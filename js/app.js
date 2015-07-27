// Инициализация каруселей по аттрибуту
// В аттрибуте хранится строка, которая является ключом к объекту с опциями карусели
$('[data-carousel]').each(function() {
    var $self = $(this);
    var opts = $self.data('carousel');

    $self.owlCarousel(settings[opts]);
});

$('form').each(function() {
    $(this).validate({
        ignore: "",

        submitHandler: function(form) {
            var $form = $(form);
            var $button = $form.find('input[type="submit"]');
            var button_old_text = $button.val();
            var data = $form.serialize() + '&action=sendrequest';

            $button.val('Отправка...');

            $.ajax('/wp-admin/admin-ajax.php', { method: 'post', data: data })
            .done(function(res) {
                var $response = $form.parent().find('.form-response');
                var $response_text = $form.parent().find('.form-response__text');

                $response_text.text(res);
                $response.fadeIn('slow');
                $button.val(button_old_text);

                setTimeout(function() {
                    $response.fadeOut('slow');
                    $form[0].reset();
                }, 3000);
            });
        }
    });
});