import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthProvider';

const AddTask = () => {

    //context value 
    const { user } = useContext(AuthContext)

    //react form hook
    const { register, handleSubmit, formState: { errors } } = useForm()

    //handlers 
    const handleAddProduct = data => {

        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=43801605fd33de89ae9f0e4f3af30dec`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    //console.log(imgdata.data.url);
                    const task = {
                        TaskName: data.TaskName,
                        img: imgdata.data.url,
                        description: data.description,
                    }
                    console.log(task);
                    //save product info to database
                    fetch(`https://task-goal-server-side.vercel.app/addTask`, {
                        method: 'POST',
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(addedTaskData => {
                            console.log(addedTaskData);
                            if (addedTaskData.insertedId) {
                                toast.success('Task data added successfully')
                            }

                        })
                }
            })
    }
    return (
        <div>
            <div className=''>
                <h1 className='text-center text-2xl font-bold bg-amber-400 p-3 w-2/3 mx-auto mt-5 rounded'> Add Your Task Here</h1>
            </div>
            <section className='mt-5'>
                <section className="p-6 w-64 mx-auto lg:w-4/5
             lg:mx-auto bg-gray-800 text-gray-50
             rounded-xl">
                    <form onSubmit={handleSubmit(handleAddProduct)} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium">Task Inormation</p>
                                <p className="text-xs">Fill the form Carefully according to field!!</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="TaskName" className="text-sm">Task Name</label>
                                    <input id="TaskName" type="text" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                        {...register("TaskName", {
                                            required: 'Task Name is required'
                                        })}
                                    />
                                    {errors.TaskName && <p className='text-red-400' role="alert">{errors.TaskName?.message}</p>}
                                </div>
                                <div className="col-span-full sm:col-span-2">
                                    <label htmlFor="Date" className="text-sm">Date</label>
                                    <input id="Date" type="date" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                        {...register("date", {
                                            required: 'date is required'
                                        })}
                                    />
                                    {errors.date && <p className='text-red-400' role="alert">{errors.date?.message}</p>}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="description" className="text-sm">Description</label>
                                    <textarea id="description" type="text" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-1"
                                        {...register("description", {
                                            required: 'description is required'
                                        })}
                                    ></textarea>
                                    {errors.description && <p className='text-red-400' role="alert">{errors.description?.message}</p>}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="image" className="text-sm">Task Image</label> <br />
                                    <input id="image" type="file"
                                        className="file-input file-input-bordered w-full max-w-xs text-black bg-slate-200 p-1 rounded"
                                        {...register("image", {
                                            required: 'image is required'
                                        })} />
                                    {errors.image && <p className='text-red-400' role="alert">{errors.image?.message}</p>}
                                </div>
                                <div className="col-span-full">
                                    <input className="px-4 py-2
                                 rounded-md w-full bg-orange-500 hover:bg-orange-600"
                                        value='Add To List' type="submit" />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </section>
            </section>
        </div>
    );
};

export default AddTask;