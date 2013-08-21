/**
 * Created with JetBrains WebStorm.
 * User: PASHA
 * Date: 20/08/13
 * Time: 09:22
 * To change this template use File | Settings | File Templates.
 */
Calc.IndexController=Ember.ObjectController.extend({

    operand1:null,
    operand2:null,
    operator:null,
    result:'',
    opearation:null,
    numberClicked:function(k){

     var result=(this.get('result')!=='')?this.get('result'):'';
        this.set('result',result+k);
    },
    operatorClicked:function(k){
     var result=this.get('result');
     var operand1=this.get('operand1');
     var operand2=this.get('operand2')
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
        this.set('result',this.get('result')+k);
        this.set('operator',k);
    },
    performOperation:function(){
      // alert("in perform")
         var operator=this.get('operator');
         var operand1=parseInt(this.get('operand1'));
         var operand2=parseInt(this.get('operand2'));
        if(operator){
            switch(operator)
            {
                case '+': this.set('result',(operand1+operand2).toString());
                          break;
                case '-': this.set('result',(operand1-operand2).toString());
                    break;
                case '/': this.set('result',(operand1/operand2).toString());
                    break;
                case '*': this.set('result',(operand1*operand2).toString());
                    break;
            }
        }
        var result=this.get('result');
        this.set('operand1',result.substring(0,result.length));
        this.set('operand2',null);
      //  this.set('operator',null);
       // this.set('operation',null);
    },
    reset:function(){
        this.set('operand1',null);
        this.set('operand2',null);
        this.set('operator',null);
        this.set('result',null);
        this.set('operation',null);
    }
})