import { 
    getInstructors, 
    createInstructor, 
    updateInstructor, 
    deleteInstructor, 
    getInstructorById,
} from "../services/instructorServices.js";
import { showMessage } from "../UI/message.js";
import { sortEntities } from "../utils/helpers.js";
import Instructor from "../Actors/Instructor.js";

export const loadInstructors = async () => {
    try {
        const instructorObjects = await getInstructors();
        //^ Converting objects to Instructor instances
        const instructors = instructorObjects.map(
            i => new Instructor(i.id, String(i.name), Number(i.salary), String(i.department))
        ).filter(i => i != null);
        return instructors;
    } catch (err) {
        showMessage(err.message, "error", 2000);
        return [];
    }
};

export const addInstructor = async (instructorData) => {
    try {
        const { id, name, salary, department } = instructorData;

        //? Create the instructor
        const newInstructor = await createInstructor({id, name, salary, department});
        showMessage(`Instructor "${newInstructor.name}" added successfully!`, "success", 3000);

        console.log("Instructor created:", newInstructor);
        return newInstructor;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const editInstructor = async (id, instructorData) => {
    try {
        const updatedInstructor = await updateInstructor(id, instructorData);
        showMessage(`Instructor updated successfully!`, "success", 3000);
        console.log("Instructor updated:", updatedInstructor);
        return updatedInstructor;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const removeInstructor = async (id) => {
    try {
        await deleteInstructor(id); 
        showMessage(`Instructor deleted successfully!`, "success", 3000);        
        return true;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const loadInstructorById = async (id) => {
    try {
        const instructor = await getInstructorById(id);
        return new Instructor(instructor.id, instructor.name, instructor.salary, instructor.department);
    } catch (err) {
        showMessage(err.message, "error", 2000);
        return null;
    }
};

//^ Check for data duplication
export async function checkDuplicateId(_id) {
    const instructors = await getInstructors();
    return instructors.some((inst) => inst.id === _id);
}

//^ Loading instructors sorted by {name || id || salary || department} and order {asc || desc}
export const loadSortedInstructors = async (column, order) => {
    if (!column) return [];
    const data = await sortEntities("instructors", column, order);
    return data.map(i => new Instructor(i.id, i.name, i.salary, i.department));
};
