CREATE OR REPLACE TRIGGER trg_foliador_usuarios
BEFORE INSERT OR UPDATE OF id_usuario ON fosiles.usuarios
FOR EACH ROW

BEGIN
    
    :NEW.id_usuario := usuario_id.nextval;
    
END;