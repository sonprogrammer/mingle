import React,{useState} from "react"


interface EditableTextProps {
    initialText: string
    maxLength: number
    onSave: (updatedText: string) => void
  }
  
  export function EditableText({initialText, maxLength, onSave}: EditableTextProps) {
  
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(initialText)
  
    const handleTextClick = () => {
      setIsEditing(true)
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value.slice(0, maxLength)
      setText(newText)
    }
  
    const handleInputBlur = () => {
      setIsEditing(false)
      onSave(text)
    }
  
    return (
      <div>
        {isEditing ? (
          <input
            type='text'
            value={text}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        ) : (
          <p onClick={handleTextClick}>{text}</p>
        )}
      </div>
    )
  }
  