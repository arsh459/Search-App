import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

function Input({ setState }) {
  let [input, setInput] = useState("")
  async function fetchQueryData(query) {
    let response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}?que=${query}`
    )
    let data = await response.json()
    setState(data.data)
    console.log(data.data)
  }
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/`)
      let data = await response.json()
      setState(data.data)
      console.log(data.data)
    }
    fetchData()
  }, [])
  function handleChange(evt) {
    setInput(evt.target.value)
    fetchQueryData(evt.target.value)
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleClick()
    }
  }
  function handleClick() {
    fetchQueryData(input)
  }
  return (
    <div className="input_wrap">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search"
        onKeyDown={handleKeyDown}
      />
      <AiOutlineSearch className="search_icon" onClick={handleClick} />
    </div>
  )
}

export default Input
