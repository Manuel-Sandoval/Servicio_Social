SELECT fo.id_fosil, fo.muestra, fo.grupo, fo.nombre, pa.id_pais, pa.nombre nombre_pais, 
       es.id_estado, es.nombre nombre_estado, mu.id_municipio, mu.nombre nombre_municipio, 
       fo.formacion, eo.id_eon, eo.nombre nombre_eon, er.id_era, er.nombre nombre_era, 
       fo.comentarios, fo.id_alta, u1.usuario usuario_alta, fo.id_modif, 
       u2.usuario usuario_modifica
FROM fosiles fo
JOIN paises pa ON (fo.id_pais = pa.id_pais)
JOIN estados es ON (fo.id_estado = es.id_estado)
JOIN municipios mu ON (fo.id_municipio = mu.id_municipio)
JOIN eones eo ON (fo.id_eon = eo.id_eon)
JOIN eras er ON (fo.id_era = er.id_era)
JOIN periodos pe ON (fo.id_periodo = pe.id_periodo)
JOIN epocas ep ON (fo.id_epoca = ep.id_epoca)
JOIN usuarios u1 ON (fo.id_alta = u1.id_usuario)
JOIN usuarios u2 ON (fo.id_modif = u2.id_usuario);
