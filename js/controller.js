/**
 * Created with JetBrains WebStorm.
 * User: PASHA
 * Date: 20/08/13
 * Time: 09:22
 * To change this template use File | Settings | File Templates.
 */
String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");

}
Calc.Button=Ember.Object.extend({
    value:'',
    type:''
})
Calc.IndexController=Ember.ObjectController.extend({
    type1Array:Ember.A(),
    type2Array:Ember.A(),
    type3Array:Ember.A(),
    operand1:null,
    operand2:null,
    operator:null,
    result:'',
    operators:['+','-','*','/','sqrt','1/x'],
    type1:[1,2,3,4,5,6,7,8,9,0,'.'],
    type2:['+','-','*','/','='],
    type3:['sqrt','1/x'],
    opearation:null,
    numberClicked:function(k){

     var result=(this.get('result')!=='')?this.get('result'):'';
        this.set('result',result+k);
    },
    operatorClicked:function(k){

     var result=this.get('result');
     var operand1=this.get('operand1');
     var operand2=this.get('operand2')
        if($.inArray(result[result.length-1],this.get('operators'))>-1){

            var temp=result.split('');
                temp[result.length-1]=k;
                result=temp.join('');
            this.set('operator',k);
            this.set('result',result);
            return;
        }
      if(operand1&&operand2){
         // alert("in perform");
        this.performOperation();
         // return;
      }
      else if(!operand1&&!operand2&&result!==null){
         this.set('operand1',result.substring(0,result.length));
          operand1=this.get('operand1');
          //alert(this.get('operand1'));
      }
      else if(operand1&&!operand2&&result!==null){
         // alert(operand1.length+1);
          //alert(result.length);
            if(operand1.length+1<result.length){
                //alert(3);
              this.set('operand2',result.substring(operand1.length+1,result.length));
              operand2=this.get('operand2');
              this.performOperation();
            }
          //alert(2);
      }
        if(k!='=')
        this.set('result',this.get('result')+k);
        this.set('operator',k);
    },
    performOperation:function(){
         var operator=this.get('operator');
         var operand1=parseFloat(this.get('operand1'));
         var operand2=parseFloat(this.get('operand2'));
         var tempRes=parseFloat(this.get('result'));

        if(operator){
            switch(operator.toString())
            {
                case '+':
                    this.set('result',(operand1+operand2).toString());
                          break;
                case '-': this.set('result',(operand1-operand2).toString());
                    break;
                case '/': this.set('result',(operand1/operand2).toString());
                    break;
                case '*': this.set('result',(operand1*operand2).toString());
                    break;
                case 'sqrt': if(tempRes){
                           this.set('result',Math.sqrt(tempRes).toString());
                            }
                      else{
                        this.set('result',"0");
                          }
                        break;
                case '1/x': if(tempRes){
                               this.set('result',(1/tempRes).toString());
                                }
                        else{
                        this.set('result',"0");
                          }
                break;
            }
        }
        var result=this.get('result');
        this.set('operand1',result.substring(0,result.length));
        this.set('operand2',null);
      //  this.set('operator',null);
       // this.set('operation',null);
    },
    singleOperation: function(k){

        if(k=="1/x"){

            this.set('operator','1/x')
            this.performOperation();
        }
        if(k=="sqrt"){
                    this.set('operator','sqrt')
                    this.performOperation();
          }


    },
    reset:function(){
        this.set('operand1',null);
        this.set('operand2',null);
        this.set('operator',null);
        this.set('result','');
        this.set('operation',null);
    },
    test:function(k){
        var value=k.get('type');

        switch(value)
        {
            case '1':
                   this.numberClicked(k.get('value'));
                    break;
            case '2': this.operatorClicked(k.get('value'))
                     break;
            case '3': this.singleOperation(k.get('value'));
                    break;
        }
    },

    init: function() {

        var arr1=this.get('type1Array');
        var arr2=this.get('type2Array');
        var arr3=this.get('type3Array');
        var t1=this.get('type1');
        var t2=this.get('type2');
        var t3=this.get('type3');
        $(t1).each(function(){
             var ob= Calc.Button.create();
                     ob.set('value',this);
                     ob.set('type','1');
                arr1.pushObject(ob);
        })
        $(t2).each(function(){
             var ob= Calc.Button.create();
                     ob.set('value',this);
                     ob.set('type','2');
                arr1.pushObject(ob);
        })
        $(t3).each(function(){
             var ob= Calc.Button.create();
                     ob.set('value',this);
                     ob.set('type','3');
                     arr3.pushObject(ob);
        })

    }

})