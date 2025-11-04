import {useState} from 'react'

const LoginForm = ({onLogin}) => {
const[form,setForm]=useState({
    username:'',
    password:''
})
const[error,setError]=useState('')
const[loading,setLoading]=useState(false)

const[touched,setTouched]=useState({
    username:false,
    password:false
})

const validateField=(name,value)=>{
    if(!value.trim()) return 'This field is required'
    if(name === 'username'){
        if(value.length<3)
            return 'Username must be at least 3 characters.'
        if(value.length>20)
            return 'Username must be less than 20 characters.'
        if(!/^[a-z0-9_]+$/i.test(value))
            return 'Only letters,numbers and underscore allowed'
    }

     if (name === 'password') {
      if (value.length < 8) return 'Password must be at least 8 characters';
      
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[@$!%*?&]/.test(value);
      
      if (!hasUpper) return 'Add an uppercase letter (A-Z)';
      if (!hasLower) return 'Add a lowercase letter (a-z)';
      if (!hasNumber) return 'Add a number (0-9)';
      if (!hasSpecial) return 'Add a special character (@$!%*?&)';
    }

    return ''
}

const validateForm=()=>{
    const newErrors={
        username:validateField('username',form.username),
        password:validateField('password',form.password)
    }
    setError(newErrors);
    return !newErrors.username && !newErrors.password;
}

const handleChange=(e)=>{
    const{name,value}=e.target
    setForm(prev=>({...prev,[name]:value}))

    if(touched[name]){
        const error=validateField(name,value);
        setError(prev=>({...prev,[name]:error}))
    }
}

const handleBlur=(e)=>{
    const {name,value}=e.target;

    setTouched(prev=>({...prev,[name]:true}))

    const error=validateField(name,value);
        setError(prev=>({...prev,[name]:error}))
}


const handleSubmit=async(e)=>{
    e.preventDefault();

    setLoading(true);

    setTouched({username:true,password:true});

    const isValid=validateForm();
    if(!isValid){
        setLoading(false);
        return;
    }
    try{
        const result=await onLogin(form.username,form.password);

        console.log(form.username,form.password)

        if(!result.success){
            setError(prev=>({
                ...prev,
                password:result.error || 'Invalid username and password'
            }))
        }

    }
    catch(error){
        setError(prev=>({
            ...prev,
            password:"Please Try Again"
        }))
    }
    finally{
        setLoading(false)
    }
}

// const isFormValid=()=>{
//     return form.username.trim() && form.password.trim()
//     && !error.username &&
//     !error.password &&
//     !loading;
// }

const canSubmit= form.username.trim() && form.password.trim() && !loading

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
    <div className="w-full max-w-md">
      {/* Card with subtle shadow and smooth animation */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-200/50 border border-white/20 p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-300/50">
        <form
          onSubmit={handleSubmit}
          className="w-full"
          noValidate
        >
          {/* Header with better typography */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {loading ? 'Signing In...' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 text-sm mt-2">Please enter your credentials to continue</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-4 text-sm sm:text-base border-2 rounded-xl focus:ring-0 outline-none transition-all duration-200 ${
                    error.username && touched.username
                      ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200/50'
                  } ${loading ? 'opacity-60' : ''}`}
                  disabled={loading}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${error.username && touched.username ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {error.username && touched.username && (
                <div className="flex items-center space-x-1 text-red-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{error.username}</p>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-4 text-sm sm:text-base border-2 rounded-xl focus:ring-0 outline-none transition-all duration-200 ${
                    error.password && touched.password
                      ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200/50'
                  } ${loading ? 'opacity-60' : ''}`}
                  disabled={loading}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${error.password && touched.password ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              {error.password && touched.password && (
                <div className="flex items-center space-x-1 text-red-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{error.password}</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              canSubmit
                ? 'bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } ${loading ? 'opacity-80' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Signing In...</span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">Sign In</span>
            )}
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-600 text-center font-medium">
              Demo Credentials
            </p>
            <div className="mt-2 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <code className="bg-white px-3 py-2 rounded-lg border border-blue-200 text-xs font-mono text-gray-700 shadow-sm">
                username: admin
              </code>
              <code className="bg-white px-3 py-2 rounded-lg border border-blue-200 text-xs font-mono text-gray-700 shadow-sm">
                password: Password123!
              </code>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-semibold text-amber-800">Password Requirements</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-amber-700">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>8+ characters</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Uppercase letter</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Lowercase letter</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Number & special character</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default LoginForm