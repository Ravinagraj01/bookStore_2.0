import React from 'react'

function Cards({ item }) {
    // console.log(item);
    
  return (
    <>
        <div className='mt-4 my-3 p-3'>
        <div className="card bg-gray-800 w-92 shadow-xl hover:scale-105 duration-200 transition ease-in-out">
            <figure>
                <img
                src={item.image}
                alt={item.name || "Book cover"} 
                className="h-64 w-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-white">
                {item.name}
                {item.publishedDate && (
                    <div className="badge badge-secondary">NEW</div>
                )}
                </h2>
                <p className="text-gray-300">{item.title}</p>
                
                {item.description && (
                    <p className="text-gray-400 text-sm line-clamp-3">
                        {item.description.length > 150 
                            ? `${item.description.substring(0, 150)}...` 
                            : item.description
                        }
                    </p>
                )}
                
                {item.publishedDate && (
                    <p className="text-gray-400 text-xs">
                        Published: {item.publishedDate}
                    </p>
                )}
                
                {item.pageCount && (
                    <p className="text-gray-400 text-xs">
                        Pages: {item.pageCount}
                    </p>
                )}
                
                <div className="card-actions justify-between mt-4">
                    <div className="badge badge-outline">
                        {item.price || 'Price not available'}
                    </div>
                    {item.infoLink && (
                        <a 
                            href={item.infoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="badge badge-outline hover:text-white hover:bg-pink-500 duration-200 hover:p-2 cursor-pointer"
                        >
                            View Details
                        </a>
                    )}
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Cards