import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };
function ChapterContent({chapter,content}) {
    if (!chapter || !content) return null;

  const parsedContent =
    typeof content.content === "string"
      ? JSON.parse(content.content)
      : content.content;

  return (
    <div className='max-w-5xl mx-auto px-6 py-10'>
        {/*header*/}
        <div className='mb-8'>
          <h2 className='font-semibold text-foreground mb-2 text-3xl'>{chapter?.chapter_name}</h2>
          <p className=' text-muted-foreground leading-relaxed'>{chapter?.about}</p>
        </div>

        {/*video*/}
        <div className='flex justify-center my-8'>
          <div className='rounded-xl overflow-hidden shadow-sm border border-border'>
            <YouTube videoId={content?.videoId} opts={opts}/>
          </div>
        </div>

        {/*content*/}
        <div className='space-y-6'>
            {parsedContent.content.map((item,index)=>( 
                <div key={index} className='p-6 shadow-sm bg-card border border-border rounded-xl'>
                    <h2 className='font-medium text-xl text-foreground mb-3'>{item.title}</h2>
                    {/*<p className='whitespace-pre-wrap'>{item.explanation}</p>*/}
                    <div className='prose prose-sm max-w-none text-foreground/90'><ReactMarkdown>{item.explanation}</ReactMarkdown></div>
                    {item.code&&<div className='border border-border rounded-lg overflow-hidden mt-5'>
                    <pre className='bg-secondary text-secondary-foreground text-sm p-4 overflow-x-auto'>
                        <code>{item.code}</code>
                    </pre>
                    </div>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterContent