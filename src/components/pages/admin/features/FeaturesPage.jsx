import { useEffect, useState } from "react"
import { Button } from "../../../atoms/Button"
import { FeatureForm } from "../../../molecules/FeatureForm"

import { createFeature, deleteFeature, getFeatures, updateFeature } from "../../../../api/featureService"
import { useAuth } from "../../../../context/AuthContext"


export const FeaturesPage = () => {

    const { token } = useAuth()

    const [features, setFeatures] = useState([])
    const [error, setError] = useState(null)

    // Form state: hidden, new feature (editing null) or editing an existing one
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)

    // When assembling the component, it requests the registered features from the backend.
    useEffect(() => {
        getFeatures().then(setFeatures).catch(() => setError('Error al cargar las características'));
    }, []);


    const openNewForm = () => {
        setEditing(null)
        setError(null)
        setShowForm(true)
    }

    const openEditForm = (feature) => {
        setEditing(feature)
        setError(null)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditing(null)
    }

    // Errors thrown here are shown inside the form by FeatureForm.
    const handleSave = async (featureData) => {
        if (editing) {
            const updated = await updateFeature(editing.id, featureData, token)
            setFeatures((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
        } else {
            const created = await createFeature(featureData, token)
            setFeatures((prev) => [...prev, created])
        }
        closeForm()
    }

    const handleDelete = async (feature) => {
        const confirmDelete = window.confirm(
            `¿Eliminar la característica "${feature.name}"? También se quitará de los productos que la tengan.`
        )
        if (!confirmDelete) return;

        try {
            await deleteFeature(feature.id, token)
            setFeatures((prev) => prev.filter((f) => f.id !== feature.id))
            if (editing?.id === feature.id) closeForm()
        } catch (err) {
            setError(err.message)
        }
    }


    return (
        <>
        <div className="m-3.5 text-blue-500">
            <Button
            onClick={openNewForm}
            text={'Añadir nueva'}
            className='rounded-sm bg-[#5D9C42] p-1.5 px-6 text-white cursor-pointer hover:bg-white transition-all duration-300 hover:text-[#5D9C42]'
            />

            {/* Add / edit block (key resets the fields when switching feature) */}
            {showForm && (
                <div className="mt-4 max-w-4xl">
                    <FeatureForm
                    key={editing?.id ?? 'new'}
                    title={editing ? 'Editar característica' : 'Nueva característica'}
                    initialName={editing?.name}
                    initialIcon={editing?.icon}
                    onSave={handleSave}
                    onCancel={closeForm}
                    />
                </div>
            )}

            <div className="mt-4 p-3 bg-white text-blue-900 rounded-sm">
                <p className="mb-3">Listado de características</p>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {!error && features.length === 0 && (
                    <p className="text-slate-500 text-sm">No hay características registradas</p>
                )}

                {/* Horizontal list: one card per feature, they wrap to the next row */}
                <div className="flex flex-wrap gap-3">
                    {features.map((feature) => (
                        <div
                        key={feature.id}
                        className={`w-36 flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors
                            ${editing?.id === feature.id ? 'border-[#5D9C42] bg-[#5D9C42]/10' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                            <i className={`${feature.icon} text-3xl text-[#5D9C42]`}></i>
                            <span className="text-sm text-slate-700 text-center">{feature.name}</span>
                            <div className="flex gap-3 text-sm">
                                <button
                                onClick={() => openEditForm(feature)}
                                className="text-blue-600 hover:underline cursor-pointer"
                                >
                                    Editar
                                </button>
                                <button
                                onClick={() => handleDelete(feature)}
                                className="text-blue-600 hover:underline cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
        </>
    )
}
