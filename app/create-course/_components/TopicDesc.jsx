import React, { useContext } from 'react'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { UserInputContext } from '../../_context/UserInputContext'

function TopicDesc() {
  const { UserCourseInput, setUserCourseInput } = useContext(UserInputContext)

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  return (
    <div className="mx-20 lg:mx-44 text-foreground">
      <div className="mt-5">
        <label className="text-muted-foreground">
          Enter the topic
        </label>
        <Input
          placeholder="Topic"
          defaultValue={UserCourseInput?.topic}
          className="h-14 text-xl bg-background border-input focus:ring-ring"
          onChange={(e) => handleInputChange('topic', e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className="text-muted-foreground">
          Tell us more about the course (Optional)
        </label>
        <Textarea
          placeholder="Course description"
          className="h-24 text-xl bg-background border-input focus:ring-ring"
          defaultValue={UserCourseInput?.description}
          onChange={(e) =>
            handleInputChange('description', e.target.value)
          }
        />
      </div>
    </div>
  )
}

export default TopicDesc
