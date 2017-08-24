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
       });
    });
})(jQuery)
