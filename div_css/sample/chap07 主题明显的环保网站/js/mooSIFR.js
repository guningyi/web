var sIFR = new Class({
    Implements : Options,
   
    options:{
        swfPath: 'Portals/Carlton/flash/',
        font: 'Christopherhand'
    },
 
    initialize:function(options){
        this.setOptions(options);
        this.elements = $$(this.options.elements);
        this.elements.each(this.createSWF,this);
    },
   
    createSWF:function(el){
        var text = el.get('html');
        var dimension = el.getSize();
        var styles = el.getStyles('text-align','padding-top','padding-bottom','padding-left','padding-right','font-size','color','padding-left','line-height');
       
        var swf_width = dimension.x - ( styles['padding-left'].toInt() + styles['padding-right'].toInt() );
        var swf_height = dimension.y - ( styles['padding-top'].toInt() + styles['padding-bottom'].toInt() );
        var obj = new Swiff(this.options.swfPath+this.options.font+'.swf', {
            width: swf_width ,
            height: swf_height ,
            container:el,
            params: {
                wmode: 'transparent'
            },
            vars: {
                txt: text,
                w: swf_width ,
                h: swf_height ,
                textalign: styles['text-align'],
                textcolor: styles['color'],
                offsetTop: styles['padding-top']
            }
        });
    }
});