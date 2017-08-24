(function($){
    $(document).ready(function(){
       var d3formsi=[];
       $('.d3formsContainer').each(function(idx){
           var func = 'd3formscb'+idx;

           $(this).dform({
               url : 'https://d3forms.d3corp.com/ajaxp.php',
               jsonp : true,
               fullErrorType    : 'show',
               successType    : 'showhide',
               scrollTopOnSuccess: true,
               scrollFirstOnError: true,
               errorClassSelector : 'div .form-group'
           });
           
            // file upload
            $(this).find('.fileuploads').each(function(){
                var fuid = $(this).attr('id');
                var $hiddenField = $('#'+$(this).data('id'));
                var $messageElement = $('#'+$(this).data('id')+'_status');

                var options = {
                    multiple : false,
                    element: document.getElementById( fuid ),
                    request: {
                        endpoint: '//d3forms.d3corp.com/cors/upload/'
                    },
                    cors: {
                        expected: true,
                    },
                    callbacks : {
                        onComplete : function(id, name, responseJson, xhr){
                            if (true == responseJson.success)
                            {
                                $hiddenField.val( responseJson.uploadName );
                                $messageElement.html( responseJson.uploadName + ' has been uploaded').show();
                            }
                            else
                            {
                                $messageElement.html(firstfile.error).show();
                            }
                        }
                    }
                };

                var uploader = new qq.FineUploader( options );
            });
       });
    });
})(jQuery)
