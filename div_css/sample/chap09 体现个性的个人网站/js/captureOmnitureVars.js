// JScript File

function SendEvents(omniture_events)
{
  //Set omniture events
  if(typeof(omniture_events)!="undefined")
  {
    RemovePageName();
    RemoveChannel();
    RemoveProduct();
    RemovePurchaseID();
    s.events=omniture_events+";";
    var s_code=s.t();
  }
}

function AddProductSendEvents(product_name,omniture_events)
 {
  //Set omniture events for an added product
  if(typeof(product_name)!="undefined")
  {
      if(typeof(omniture_events)!="undefined")
      {
        RemovePageName();
        RemoveChannel();
        RemoveProduct();
        RemovePurchaseID();
        s.events=omniture_events+";";
        if(product_name.length > 0)
        {
          s.products=product_name+";";
        }
        var s_code=s.t();
      }
   }
 }
 
function RemoveProduct() 
{
  if(s.products != '')
     {
      s.products="";
     }
} 

function RemovePurchaseID() 
{
  if(s.purchaseID != '')
     {
      s.purchaseID="";
     }
} 
function RemovePageName()
 {
  if(s.pageName != '')
     {
      s.pageName="";
     }
 }

function RemoveChannel()
 {
  if(s.channel != '')
     {
     s.channel="";
     }
 }
