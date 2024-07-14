import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import useAxiosprivate from '../hooks/useAxiosprivate';
import '../styles/jodit-dark-theme.css';

export default function CreatePost() {
  const axiosPrivate = useAxiosprivate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const {currentUser} = useSelector((state)=> state.user)
  const {theme} = useSelector((state)=> state.theme)
  const [formData, setFormData] = useState({author:currentUser.username});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const editor = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (editor.current) {
      editor.current.focus();
    }
  }, [editor]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = { ...formData, content: contentRef.current };   
    try {
      const res = await axiosPrivate.post(`post/create`, newFormData);  
      const savedPost = res.data; 
      if (res.status !== 201) {
        setPublishError(savedPost.message); 
      } else {
          setPublishError(null);
          navigate(`/post/${savedPost.slug}`);
      }
  
    } catch (error) {      
      const errormsg = error.response?.data?.message || "something went wrong "
      setPublishError(errormsg);
    }
  };


  const config = useMemo(
    () => ({
        zIndex: 0,
        readonly: false,
        activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
        toolbarButtonSize: 'middle',
        theme: theme == 'dark' ? 'dark' : 'default',
        enableDragAndDropFileToEditor: true,
        saveModeInCookie: false,
        spellcheck: true,
        editorCssClass: false,
        triggerChangeEvent: true,
        height: 450,
        direction: 'ltr',
        language: 'pt_BR',
        debugLanguage: false,
        i18n: 'en',
        tabIndex: -1,
        toolbar: true,
        enter: 'P',
        useSplitMode: false,
        colorPickerDefaultTab: 'background',
        imageDefaultWidth: 100,
        removeButtons: ['about', 'print', 'file'],
        disablePlugins: ['paste', 'stat'],
        events: {},
        textIcons: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        placeholder: '',
        showXPathInStatusbar: false,
    }),
    [theme]
)

  return (
    <div className='p-3 max-w-3xl pb-16 mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold orbitron'>Create a post</h1>
      <p>{currentUser.username}</p>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='ai'>AI</option>
            <option value='blockchain'>Blockchain</option>
            <option value='security'>Security</option>
            <option value='clouds'>Clouds</option>
            <option value='webapps'>Webapps</option>
            <option value='iot'>IOT</option>
            <option value='trends'>Trends</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between rounded border-2  p-2'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

      <JoditEditor
			ref={editor}
      value={contentRef.current}
      config={config}
      onChange={(newContent) => {
        contentRef.current = newContent;
      }}
		/>
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
