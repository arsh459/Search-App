import Card from "../components/Card"
import Input from "../components/Input"
import { useState } from "react"
import "./SearchPage.css"

export default function SearchPage() {
  let [state, setState] = useState([])
  return (
    <div className="search">
      <h1 style={{ textAlign: "center" }}>Search App</h1>
      <div className="input">
        <Input setState={setState} />
      </div>
      <h3 style={{ textAlign: "center" }}>Results:-{state.length}</h3>
      <div className="card">
        {state.map((e) => {
          return <Card key={e._id} data={e} />
        })}
      </div>
    </div>
  )
}
