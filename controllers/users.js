const User = require('../models/user');


module.exports.renderRegister =(req, res)=>{
    res.render('Users/register');
}

module.exports.register=async(req, res)=>{
    try {
    const{email,username,password} = req.body;
   const user =new User({email,username});
   const registerdUser=  await User.register(user,password);
   req.login(registerdUser,err=>{
       if(err){
           return next(err);
       }
       req.flash('success','Welcome to YelpCamp');
       res.redirect("/campgrounds");
   })
   
} catch(e){
    req.flash('error',e.message);
    res.redirect('/register');
}
}


module.exports.renderLogin = (req, res) => {
    res.render('Users/login');
    }


module.exports.login =(req, res) => {

    
    req.flash('success','Welcome black');
    const redirectUrl=req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);


}


module.exports.logout =(req, res)=>{
    req.logOut();
    req.flash('success',"Goodbye!!");
    res.redirect('/campgrounds');
}