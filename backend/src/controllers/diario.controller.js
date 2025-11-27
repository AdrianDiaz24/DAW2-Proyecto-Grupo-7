const Diario = require('../models/diario_mongoose');

// Crear una nueva entrada en el diario
exports.crearEntradaDiario = async (req, res) => {
    try {
        const { titulo, cuerpo } = req.body;
        const usuarioId = req.user.id; // Asumiendo que el middleware de autenticación añade el usuario al request

        const nuevaEntrada = new Diario({
            usuarioId,
            titulo,
            cuerpo,
        });

        await nuevaEntrada.save();
        res.status(201).json({ message: 'Entrada del diario creada con éxito', entrada: nuevaEntrada });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la entrada del diario', error: error.message });
    }
};

// Obtener todas las entradas del diario de un usuario
exports.obtenerEntradasDiario = async (req, res) => {
    try {
        const usuarioId = req.user.id;
        const entradas = await Diario.find({ usuarioId }).select('-password'); // No devolver la contraseña
        res.status(200).json(entradas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las entradas del diario', error: error.message });
    }
};

// Obtener una entrada específica del diario
exports.obtenerEntradaDiarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const usuarioId = req.user ? req.user.id : null;

        const entrada = await Diario.findById(id);

        if (!entrada) {
            return res.status(404).json({ message: 'Entrada del diario no encontrada' });
        }

        // Si el usuario es el propietario, puede acceder
        if (entrada.usuarioId.toString() === usuarioId) {
            return res.status(200).json(entrada);
        }

        // Si la entrada no tiene contraseña, es privada para el autor
        if (!entrada.password) {
            return res.status(403).json({ message: 'Acceso denegado. Esta entrada es privada.' });
        }

        // Si la entrada tiene contraseña, verificarla
        if (!password) {
            return res.status(401).json({ message: 'Se requiere contraseña para acceder a esta entrada.' });
        }

        const passwordCorrecta = await entrada.compararPassword(password);
        if (passwordCorrecta) {
            const entradaPublica = entrada.toObject();
            delete entradaPublica.password; // No exponer el hash de la contraseña
            return res.status(200).json(entradaPublica);
        } else {
            return res.status(403).json({ message: 'Contraseña incorrecta.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la entrada del diario', error: error.message });
    }
};

// Actualizar una entrada del diario (incluyendo añadir/cambiar contraseña)
exports.actualizarEntradaDiario = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, cuerpo, password } = req.body;
        const usuarioId = req.user.id;

        const entrada = await Diario.findById(id);

        if (!entrada) {
            return res.status(404).json({ message: 'Entrada del diario no encontrada' });
        }

        if (entrada.usuarioId.toString() !== usuarioId) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta entrada' });
        }

        if (titulo) entrada.titulo = titulo;
        if (cuerpo) entrada.cuerpo = cuerpo;
        if (password) {
            entrada.password = password;
        } else if (password === '') { // Permitir eliminar la contraseña
            entrada.password = undefined;
        }


        await entrada.save();
        res.status(200).json({ message: 'Entrada del diario actualizada con éxito', entrada });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la entrada del diario', error: error.message });
    }
};

// Eliminar una entrada del diario
exports.eliminarEntradaDiario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user.id;

        const entrada = await Diario.findById(id);

        if (!entrada) {
            return res.status(404).json({ message: 'Entrada del diario no encontrada' });
        }

        if (entrada.usuarioId.toString() !== usuarioId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta entrada' });
        }

        await Diario.findByIdAndDelete(id);
        res.status(200).json({ message: 'Entrada del diario eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la entrada del diario', error: error.message });
    }
};

