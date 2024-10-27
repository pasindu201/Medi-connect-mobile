import React, { useState } from 'react';
import { AddIcon } from './Icons/icon';
import BarChart from './Barchart';

const Filter = () => {
  const [isCheckedAge, setIsCheckedAge] = useState(false);
  const [isCheckedDisease, setIsCheckedDisease] = useState(false);
  const [isCheckedDistrict, setIsCheckedDistrict] = useState(false);
  const [isCheckedProvince, setIsCheckedProvince] = useState(false);
  const [isCheckedMedicine, setIsCheckedMedicine] = useState(false);
  const [isCheckedGender, setIsCheckedGender] = useState(false);
  const[StatrAge,setStartAge] =useState();
  const[EndAge,setEndAge]=useState();
  const[StepSize,setStepSize]=useState();
  const [activeToggles, setActiveToggles] = useState(0); 
  const [diseases, setDiseases] = useState([{ id: 1, value: '' }]);
  const [District,setDistrict]=useState([{id : 1, value : ''}]);
  const [Province,setProvince]=useState([{id : 1, value : ''}]);
  const [Medicine,setMedicine]=useState([{id : 1, value : ''}]);
  const [Gender,setGender]=useState([{id : 1, value : ''}]);

  const handleToggle = (isChecked, setIsChecked) => {
    if (isChecked) {
      setIsChecked(false);
      setActiveToggles(activeToggles - 1);
    } else if (activeToggles < 2) {
      setIsChecked(true);
      setActiveToggles(activeToggles + 1);
    }
  };
  const handleToggleAge = () => handleToggle(isCheckedAge, setIsCheckedAge);
  const handleToggleDisease = () => handleToggle(isCheckedDisease, setIsCheckedDisease);
  const handleToggleDistrict = () => handleToggle(isCheckedDistrict, setIsCheckedDistrict);
  const handleToggleProvince = () => handleToggle(isCheckedProvince, setIsCheckedProvince);
  const handleToggleMedicine = () => handleToggle(isCheckedMedicine, setIsCheckedMedicine);
  const handleToggleGender = () => handleToggle(isCheckedGender, setIsCheckedGender);

  const handleStartAge=(event)=>{
    setStartAge(event.target.value);
  }

  const handleEndAge=(event)=>{
    setEndAge(event.target.value);
  }

  const handleStep=(event)=>{
    setStepSize(event.target.value);
  }

  // Handle adding a new disease input box
  const handleAddDisease = () => {
    setDiseases([...diseases, { id: diseases.length + 1, value: '' }]);
  };

  // Handle changes in disease input values
  const handleDiseaseChange = (id, event) => {
    const newDiseases = diseases.map(d => d.id === id ? { ...d, value: event.target.value } : d);
    setDiseases(newDiseases);
  };

  // Handle adding a new disease input box
  const handleAddDistrict = () => {
    setDistrict([...District, { id: District.length + 1, value: '' }]);
  };

  // Handle changes in disease input values
  const handleDistrictChange = (id, event) => {
    const newDistrict = District.map(d => d.id === id ? { ...d, value: event.target.value } : d);
    setDistrict(newDistrict);
  };

  const handleAddProvince = () => {
    setProvince([...Province, { id: Province.length + 1, value: '' }]);
  };

  // Handle changes in disease input values
  const handleProvinceChange = (id, event) => {
    const newProvince = Province.map(d => d.id === id ? { ...d, value: event.target.value } : d);
    setProvince(newProvince);
  };

  const handleAddMedicine = () => {
    setMedicine([...Medicine, { id: Medicine.length + 1, value: '' }]);
  };

  // Handle changes in disease input values
  const handleMedicineChange = (id, event) => {
    const newMedicine = Medicine.map(d => d.id === id ? { ...d, value: event.target.value } : d);
    setMedicine(newMedicine);
  };

  const handleAddGender = () => {
    setGender([...Gender, { id: Gender.length + 1, value: '' }]);
  };

  // Handle changes in disease input values
  const handleGenderChange = (id, event) => {
    const newGender = Gender.map(d => d.id === id ? { ...d, value: event.target.value } : d);
    setGender(newGender);
  };

  // X-Axis intialization
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const[Reportstatus,setReportstatus]=useState(false);

  // Function to handle X-Axis selection
  const handleXAxisChange = (event) => {
    setXAxis(event.target.value);
    // Reset Y-axis selection if it matches the new X-axis
    if (event.target.value === yAxis) {
      setYAxis('');
    }
  };

  // Function to handle Y-Axis selection
  const handleYAxisChange = (event) => {
    setYAxis(event.target.value);
  };

  let hashmap={};
  console.log(hashmap);
  const getXAxisOptions=()=>{
    const options=[];
    let temp=[];

    if(isCheckedAge) {
      
      options.push("Age Class");
      hashmap['Age Class']=[StatrAge,EndAge,StepSize];
    };
    if(isCheckedDisease) {options.push("Disease");
      
      diseases.forEach(disease => {
               if (disease.value) {
                 temp.push(disease.value);
               }
            });
      hashmap["Disease"]=temp;
      console.log("temp");
      console.log(hashmap["Disease"]);
      console.log(temp);
      temp=[];

    };
    if(isCheckedDistrict) {options.push("District");
      District.forEach(District => {
        if (District.value) {
          temp.push(District.value);
        }
     });
        hashmap["District"]=temp;
        console.log("temp");
        console.log(hashmap["District"]);
        console.log(temp);
        temp=[];

    };
    if(isCheckedProvince) {options.push("Province");
      Province.forEach(Province => {
        if (Province.value) {
          temp.push(Province.value);
        }
     });
        hashmap["Province"]=temp;
        console.log("temp");
        console.log(temp);
        console.log(hashmap["Province"]);
        temp=[];
  
    };
    if(isCheckedMedicine) {options.push("Medicine");

      Medicine.forEach(Medicine => {
        if (Medicine.value) {
          console.log(Medicine.value)
          temp.push(Medicine.value);
        }
     });
        hashmap["Medicine"]=temp;
        console.log("temp");
        console.log(temp);
        console.log(hashmap["Medicine"]);
        temp=[];
    };
    if(isCheckedGender) {options.push("Gender");
      Gender.forEach(Gender => {
        if (Gender.value) {
          temp.push(Gender.value);
        }
     });
        hashmap["Gender"]=temp;
        console.log("temp");
        console.log(temp);
        console.log(hashmap["Gender"]);
        temp=[];

    };
    return options;
  }

  // Function to get Y-Axis options based on X-Axis selection
  const getYAxisOptions = () => {
    return getXAxisOptions().filter(option => option !== xAxis);
  };

  /////////////////////////// generate barchart darta table button func /////////////////
  const handleGenerateReport = () => {
    if (xAxis && yAxis) {
      console.log(`Generating report for X-Axis: ${xAxis}, Y-Axis: ${yAxis}`);
      setReportstatus(true);
    } else {
      alert("Please select valid X and Y axes.");
    }
  };
  //////////////////////////////////
  
  return (
    <div >
      <div className="text-gray-500 text-xl" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        Filters
      </div>
      {/* ------------------------------------     Age Block              ---------------------------------------------------------------------- */}
      <div  className='flex pt-5'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold text-sm">Age</div>
      
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer pl-48">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedAge}
              onChange={handleToggleAge}
            />
            {/* Line */}
            <div className={`block ${isCheckedAge ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedAge ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedAge ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>
        </label> 
        <div className='pl-12'>
        <input type="number"  min="1" max="100" className=' border border-black text-black placeholder-black w-32 rounded-md text-center' value={StatrAge} onChange={handleStartAge} disabled={!isCheckedAge} placeholder='From' required/>      
        </div>
        <div className='pl-6'>
        <input type="number"  min="1" max="100" className=' border border-black text-black placeholder-black w-32 rounded-md text-center' value={EndAge} onChange={handleEndAge} disabled={!isCheckedAge} placeholder='To' required/>      
        </div>
        <div className='pl-6'>
        <input type="number"  min="1" max="100" className=' border border-black  text-black placeholder-black w-32 rounded-md text-center' value={StepSize} onChange={handleStep} disabled={!isCheckedAge} placeholder='Step' required/>      
        </div>
      </div>
      {/* --------------------------------------------------------Age Block  End  ---------------------------------------------------------------------- */}

      {/* --------------------------------------------------------  Disease Block  ---------------------------------------------------------------------- */}
      <div  className='flex pt-3'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold pt-3 text-sm">Disease</div>
      
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer " style={{paddingLeft:'165px'}}>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedDisease}
              onChange={handleToggleDisease}
            />
            {/* Line */}
            <div className={`block ${isCheckedDisease ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedDisease ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedDisease ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>
        </label>

        <div className="flex flex-wrap " style={{paddingLeft:'46px'}}>
          {diseases.map((disease) => (
            
            <div className='pr-6 pt-3'>
                 <input
              key={disease.id}
              type="text"
              className='border border-black  text-black  w-32 h-7 text-center  '
              value={disease.value}
              onChange={(e) => handleDiseaseChange(disease.id, e)}
              disabled={!isCheckedDisease}
              placeholder={`Disease ${disease.id}`}
            />
            </div>
           
          ))}
        </div>
        <button onClick={handleAddDisease} disabled={!isCheckedDisease}>
          <AddIcon />
        </button>
      </div>
      {/* -------------------------------------------------------- Disease Block  End  ---------------------------------------------------------------------- */}

      {/* --------------------------------------------------------   District Block  ---------------------------------------------------------------------- */}
      <div  className='flex pt-3'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold pt-3 text-sm">District</div>
      
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer " style={{paddingLeft:'165px'}}>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedDistrict}
              onChange={handleToggleDistrict}
            />
            {/* Line */}
            <div className={`block ${isCheckedDistrict ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedDistrict ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedDistrict ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>
        </label>
        <div className="flex flex-wrap " style={{paddingLeft:'48px'}}>
        {District.map((District) => (
          <div className='pr-6 pt-2' key={District.id}> {/* Move key here */}
            <input
              type="text"
              className='border border-black text-black  w-32 h-7 text-center  '
              value={District.value}
              onChange={(e) => handleDistrictChange(District.id, e)}
              disabled={!isCheckedDistrict}
              placeholder={`District ${District.id}`}
            />
          </div>
))}
        </div>
        <button onClick={handleAddDistrict} disabled={!isCheckedDistrict}>
          <AddIcon />
        </button>
      </div>
      {/* --------------------------------------------------------  District Block  End  ---------------------------------------------------------------------- */}

      {/* --------------------------------------------------------Province Block   ---------------------------------------------------------------------- */}
      <div  className='flex pt-3'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold pt-3 text-sm">Province</div>   
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer "style={{paddingLeft:'155px'}}>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedProvince}
              onChange={handleToggleProvince}
            />
            {/* Line */}
            <div className={`block ${isCheckedProvince ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedProvince ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedProvince ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>
        </label>
        <div className="flex flex-wrap " style={{paddingLeft:'48px'}}>
        {Province.map((Province) => (
  <div className='pr-6 pt-2' key={Province.id}> {/* Move key here */}
    <input
      type="text"
      className='border border-black  text-black  w-32 h-7 text-center   '
      value={Province.value}
      onChange={(e) => handleProvinceChange(Province.id, e)}
      disabled={!isCheckedProvince}
      placeholder={`Province ${Province.id}`}
    />
  </div>
))}
        </div>
        <button onClick={handleAddProvince} disabled={!isCheckedProvince}>
          <AddIcon />
        </button>
      </div>
      {/* --------------------------------------------------------Province  Block  End  ---------------------------------------------------------------------- */}

      {/* --------------------------------------------------------Medicine Block  ---------------------------------------------------------------------- */}
      <div  className='flex pt-3'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold pt-3 text-sm">Medicine</div>
      
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer "style={{paddingLeft:'153px'}}>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedMedicine}
              onChange={handleToggleMedicine}
            />
            {/* Line */}
            <div className={`block ${isCheckedMedicine ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedMedicine ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedMedicine ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>   
        </label>

        <div className="flex flex-wrap " style={{paddingLeft:'48px'}}>
        {Medicine.map((Medicine) => (
  <div className='pr-6 pt-2' key={Medicine.id}> {/* Move key here */}
    <input
      type="text"
      className='border border-black  text-black  w-32 h-7 text-center   '
      value={Medicine.value}
      onChange={(e) => handleMedicineChange(Medicine.id, e)}
      disabled={!isCheckedMedicine}
      placeholder={`Medicine ${Medicine.id}`}
    />
  </div>
))}
        </div>
        <button onClick={handleAddMedicine} disabled={!isCheckedMedicine}>
          <AddIcon />
        </button>
      </div>

      {/* --------------------------------------------------------Medicine  Block  End  ---------------------------------------------------------------------- */}

      {/* --------------------------------------------------------Gender Block---------------------------------------------------------------------- */}
      <div  className='flex pt-3'    style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="font-bold pt-3 text-sm">Gender</div>
      
         {/* Toggle Button */}
         <label className="flex items-center cursor-pointer "style={{paddingLeft:'165px'}}>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCheckedGender}
              onChange={handleToggleGender}
            />
            {/* Line */}
            <div className={`block ${isCheckedGender ? 'bg-black' : 'bg-white'} w-14 h-6 rounded-full border-2 border-black `}></div>
            {/* Dot */}
            <div className={`dot absolute left-1 top-1 ${isCheckedGender ? 'bg-white':'bg-black'} w-4 h-4 rounded-xl transition transform ${isCheckedGender ? 'translate-x-8' : 'translate-x-0 '}`}></div>
          </div>
        </label>  

        <div className="flex flex-wrap " style={{paddingLeft:'48px'}}>
        {Gender.map((Gender) => (
  <div className='pr-6 pt-2' key={Gender.id}> {/* Move key here */}
    <input
      type="text"
      className='border border-black  text-black  w-32 h-7 text-center   '
      value={Gender.value}
      onChange={(e) => handleGenderChange(Gender.id, e)}
      disabled={!isCheckedGender}
      placeholder={`Gender ${Gender.id}`}
    />
  </div>
))}
        </div>
        <button onClick={handleAddGender} disabled={!isCheckedGender}>
          <AddIcon />
        </button>
      </div>
      {/* --------------------------------------------------------Gender Block  End  ---------------------------------------------------------------------- */}    
      <div className='flex'>
        {/* Drop down box X-axis */}
      <div className='flex pt-5 pl-20 pr-20' >
        <div className="font-bold text-sm"></div>
        <select
          className=' border-2 w-24 h-8 border-black text-black rounded-lg'
          value={xAxis}
          onChange={handleXAxisChange}
        >
          <option value="" disabled className='text-sm'>X-axis</option>
          {getXAxisOptions().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>  
          {/* Y-Axis Dropdown */}
      <div className='flex pt-5 pl-20' >
        <div className="font-bold text-sm"></div>
        <select
          className=' border-2 w-24 h-8 border-black text-black rounded-lg'
          value={yAxis}
          onChange={handleYAxisChange}
          disabled={!xAxis} // Disable if no X-axis is selected
        >
            <option value="" disabled>Y-axis</option>
            {getYAxisOptions().map((option, index) => (
              hashmap[option] && Array.isArray(hashmap[option]) ? (
                hashmap[option].map((item, subIndex) => (
                  <option key={`${index}-${subIndex}`} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option key={index} value={option}>
                  {hashmap[option]}
                </option>
              )
            ))}

        </select>
      </div>
          
      <div className='flex pt-5 pl-16'>
        <button
          onClick={handleGenerateReport}
          className='bg-blue-400 text-black font-semibold text-sm py-2 px-4 rounded-3xl '
        >
          Generate Graph
        </button>
      </div>
      </div>   
      {/* End x-axis dropdown */}
    <div className="">
        {Reportstatus && yAxis!=='' &&(
          <>
             <BarChart xAxis={xAxis} yAxis={yAxis}  xPara={hashmap[xAxis]}/>
          </>
        )}     
    </div>
    </div>   
  );
};

export default Filter;
