import AddAttendeeToPresentationForm from "./components/AddAttendeeToPresentationForm"
import AttendeeForm from "./components/AttendeeForm"
import PresentationForm from "./components/PresentationForm"

function App() {

  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-2">
        <img src="https://uploads-ssl.webflow.com/61e32a97d43b8b3ee1bcb899/61efcd8c81e8460551c1c684_SUCASA-LOGO.svg" alt="" className="w-40 p-1 m-2" />
      </div>
      <div className="flex flex-col items-center justify-evenly lg:flex-row lg:items-start space-x-2">
        <PresentationForm />
        <AttendeeForm />
        <AddAttendeeToPresentationForm />
      </div>
    </div>
  )
}

export default App
