import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox=(function() {
      
     
     return function(opts ){  // 配置参数
        var defaults={  //默认值
            title:'',
            content:'',
            cancle:'',
            ok:'',
            handleCancle:null,
            handleOk:null,
        };
   
        var MyComponent =Vue.extend(MessageBox);

        for(var attr in opts){
            defaults[attr] = opts[attr];
        }
        

        var vm=new MyComponent( {
            el:document.createElement('div'),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancle:defaults.cancle,
                ok:defaults.ok,
            },
            methods: {
                handleCancle(){
                    defaults.handleCancle && defaults.handleCancle.call(this);
                    document.body.removeChild(vm.$el);               
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el )
                }
            },
        });

             document.body.appendChild( vm.$el );

     };
})(); 