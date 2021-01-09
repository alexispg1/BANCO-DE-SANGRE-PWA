'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BloodDoner=use('App/Models/BloodDoner');
const MedicalAppointMent=use('App/Models/MedicalAppointment');
const ScoreQuiz=use('App/Models/ScoreQuiz');
const UserData=use('App/Models/UserDatum');
const Database = use('Database');

class MedicalAppointMentController {
 
  async index ({ request, response, view, auth }) {
    const user =await auth.getUser(); 
    const medicalAppointMent =await Database.table('users')
    .innerJoin('user_data',user.id, 'user_data.id_user')
    .where('users.email',user.email)
    .innerJoin('blood_doners','user_data.id','blood_doners.id_user_data')
    .innerJoin('medical_appointments','blood_doners.id','medical_appointments.id_blood_doner')
    .select('medical_appointments.id','userName','UserFirtsName','UserLastName','sex','movilPhone','bloodType','date','time',
    'medical_appointments.status');
    return response.json({medicalAppointMent})
  }


  async store ({ request, response ,auth }) {
    const user = await auth.getUser();
    const data=request.all();
    const appointMent =new MedicalAppointMent();
    const userData=await UserData.findByOrFail("id_user",user.id);
    const doner= await BloodDoner.findByOrFail('id_user_data',userData.id);
    appointMent.time=data.time;
    appointMent.date=data.date;
    appointMent.status="falso";
    appointMent.id_blood_doner=doner.id;

    if(data.time==null||data.date==null){
      return response.json({message:'fields empty'});
    }
    else{

      await appointMent.save();
        const doner_cita=({
          Name:user.userName,
          FirstName:user.userFirtsName,
          LastName:user.userLastName,
          sex:userData.sex,
          movil:userData.movilPhone,
          blood:doner.bloodType,
          date:appointMent.date,
          time:appointMent.time,
          });
        return response.json({doner_cita});
    }
    
  }

  async update ({ params, request, response,auth }) {
    const user= await auth.getUser();
    const id=params.id;
    const data=request.all();
    const appoint_Ment= await MedicalAppointMent.find(id);
    if(appoint_Ment){

      if(data.time==null&&data.date!=null){
        appoint_Ment.merge({
        date:data.date,
        });
        await appoint_Ment.save();
        return response.json({appoint_Ment});
      }

      if(data.time!=null&&data.date==null){
        appoint_Ment.merge({
          time:data.time,
        });
        await appoint_Ment.save();
        return response.json({appoint_Ment});
      }

      if(data.time!=null&&data.date!=null){
        appoint_Ment.merge({
          time:data.time,
          date:data.date,
        });
        await appoint_Ment.save();
        return response.json({appoint_Ment});
      }

    }

    else{
      return response.json({error:'not exist Medical Appoinment'});       
    }

  }

  async theLast({response,auth}){
    const user = await auth.getUser();
    const  citas=await Database.table('users')
    .innerJoin('user_data','users.id','user_data.id_user')
    .innerJoin('blood_doners','user_data.id','blood_doners.id_user_data')
    .innerJoin('medical_appointments','blood_doners.id','medical_appointments.id_blood_doner')
    .where('medical_appointments.id_blood_doner',user.id)
    .orderBy('medical_appointments.id','desc')
    .select('medical_appointments.id','userName','userFirtsName','userLastName',
    'user_data.movilPhone','blood_doners.bloodType','medical_appointments.time','medical_appointments.date'
    ,'medical_appointments.status')
   

    return response.json({citas});
  }

  async destroy ({ params, request, response ,auth}) {
    const user=await auth.getUser();
    const id=params.id;
    const medicalAppointMent= await MedicalAppointMent.find(id);
    if(medicalAppointMent){
      await medicalAppointMent.delete();
      return response.json({medicalAppointMent});
    }else{
      return response.json({message:'medical appointment not exist'});
    }
    
  }

 
  async AllAppointMent({response,request,auth}){
    const user = await auth.getUser();
    var fecha = new Date(); 
    var mes = fecha.getMonth()+1; 
    var dia = fecha.getDate(); 
    var ano = fecha.getFullYear(); 
    var date=ano+"-"+mes+"-"+dia;
    const  citas=await Database.table('users')
    .innerJoin('user_data','users.id','user_data.id_user')
    .innerJoin('blood_doners','user_data.id','blood_doners.id_user_data')
    .innerJoin('medical_appointments','blood_doners.id','medical_appointments.id_blood_doner')
    .where('medical_appointments.date',date)
    .andWhere('medical_appointments.status','falso')
    .select('medical_appointments.id','userName','userFirtsName','userLastName',
    'user_data.movilPhone','blood_doners.bloodType','medical_appointments.time','medical_appointments.date'
    ,'medical_appointments.status')

    return response.json({citas});
  }
  
    async DeleteAppointMent({response,request,params,auth}){
    const user = await auth.getUser();
    const id=params.id;
    const data=request.all();
    const medicalAppointMent= await MedicalAppointMent.find(id);
    medicalAppointMent.merge({
      status:data.status,  
    })
    await medicalAppointMent.save();
    return response.json({medicalAppointMent});
  }

  

  
}

module.exports = MedicalAppointMentController
