import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar el paciente' });
    }
};

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id);
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener pacientes' });
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        if (!paciente.veterinario.equals(req.veterinario._id)) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener el paciente' });
    }
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        if (!paciente.veterinario.equals(req.veterinario._id)) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        // Actualizar Paciente
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fecha = req.body.fecha || paciente.fecha;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;

        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar el paciente' });
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        if (!paciente.veterinario.equals(req.veterinario._id)) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar el paciente' });
    }
};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};
